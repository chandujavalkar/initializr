@Service
public class StorageGridService {

    private final S3Client s3Client;

    private static final String BUCKET = "my-test-bucket";
    private static final long PART_SIZE = 5 * 1024 * 1024; // 5MB

    public StorageGridService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public void multipartUpload(MultipartFile file) {

        String key = file.getOriginalFilename();
        String uploadId = null;
        List<CompletedPart> completedParts = new ArrayList<>();

        try {
            // 1. Initiate multipart upload
            uploadId = s3Client.createMultipartUpload(
                    CreateMultipartUploadRequest.builder()
                            .bucket(BUCKET)
                            .key(key)
                            .contentType(file.getContentType())
                            .build()
            ).uploadId();

            try (InputStream inputStream = file.getInputStream()) {

                byte[] buffer = new byte[(int) PART_SIZE];
                int bytesRead;
                int partNumber = 1;

                while ((bytesRead = inputStream.read(buffer)) > 0) {

                    UploadPartResponse response =
                            s3Client.uploadPart(
                                    UploadPartRequest.builder()
                                            .bucket(BUCKET)
                                            .key(key)
                                            .uploadId(uploadId)
                                            .partNumber(partNumber)
                                            .contentLength((long) bytesRead)
                                            .build(),
                                    RequestBody.fromBytes(
                                            Arrays.copyOf(buffer, bytesRead)
                                    )
                            );

                    completedParts.add(
                            CompletedPart.builder()
                                    .partNumber(partNumber)
                                    .eTag(response.eTag())
                                    .build()
                    );

                    partNumber++;
                }
            }

            // 2. Complete multipart upload (ASSEMBLES FILE)
            s3Client.completeMultipartUpload(
                    CompleteMultipartUploadRequest.builder()
                            .bucket(BUCKET)
                            .key(key)
                            .uploadId(uploadId)
                            .multipartUpload(
                                    CompletedMultipartUpload.builder()
                                            .parts(completedParts)
                                            .build()
                            )
                            .build()
            );

        } catch (Exception ex) {

            // 3. Abort multipart upload (CLEANUP)
            if (uploadId != null) {
                s3Client.abortMultipartUpload(
                        AbortMultipartUploadRequest.builder()
                                .bucket(BUCKET)
                                .key(key)
                                .uploadId(uploadId)
                                .build()
                );
            }

            throw new RuntimeException("Multipart upload failed and was aborted", ex);
        }
    }
}
