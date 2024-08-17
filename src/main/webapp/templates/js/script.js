$(document).ready(function() {
    var modal = $('#dependencyModal');
    var selectedDependencies = [];

    // Open the modal when the "Add Dependencies" button is clicked
    $('#addDependenciesBtn').on('click', function() {
        modal.show();
    });

    // Close the modal when the "x" is clicked
    $('.close').on('click', function() {
        modal.hide();
    });

    // Close the modal when clicking outside of the modal content
    $(window).on('click', function(event) {
        if ($(event.target).is(modal)) {
            modal.hide();
        }
    });

    // Handle saving selected dependencies
    $('#saveDependenciesBtn').on('click', function() {
        selectedDependencies = [];
        $('#dependencyModal input:checked').each(function() {
            selectedDependencies.push($(this).val());
        });

        // Display the selected dependencies in the main form
        $('#selectedDependencies').html(selectedDependencies.join(', '));

        // Hide the modal after saving
        modal.hide();
    });




    // Handle form submission
    $('#projectForm').on('submit', function(event) {
        event.preventDefault();

        var formData = $(this).serializeArray();
        var projectData = {};

        $.each(formData, function(index, field) {
            projectData[field.name] = field.value;
        });

        // Add selected dependencies to the project data
        projectData.dependencies = selectedDependencies;

        // Display the form data including selected dependencies in a result div
        $('#result').html('<pre>' + JSON.stringify(projectData, null, 2) + '</pre>');

        // Uncomment the following lines to send data to the server
        // $.ajax({
        //     url: '/generate-project', // Replace with your endpoint
        //     method: 'POST',
        //     contentType: 'application/json',
        //     data: JSON.stringify(projectData),
        //     success: function(response) {
        //         // Handle the server response
        //         console.log('Project generated successfully:', response);
        //     },
        //     error: function(error) {
        //         console.error('Error generating project:', error);
        //     }
        // });
    });
});
