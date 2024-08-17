<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Initializr</title>
    <link rel="stylesheet" href="/css/styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/js/script.js" defer></script>
</head>
<body>
    <div class="container">
        <h1>Project Initializr</h1>
        <form id="projectForm">
            <div class="form-group">
                <label for="projectName">Project Name:</label>
                <input type="text" id="projectName" name="projectName" required>
            </div>

            <div class="form-group">
                <label for="groupId">Group ID:</label>
                <input type="text" id="groupId" name="groupId" required>
            </div>

            <div class="form-group">
                <label for="artifactId">Artifact ID:</label>
                <input type="text" id="artifactId" name="artifactId" required>
            </div>

            <div class="form-group">
                <label for="javaVersion">Java Version:</label>
                <select id="javaVersion" name="javaVersion">
                    <option value="8">8</option>
                    <option value="11">11</option>
                    <option value="17">17</option>
                </select>
            </div>

            <div class="form-group">
                <label>Packaging:</label>
                <div class="radio-group">
                    <input type="radio" id="jar" name="packaging" value="jar" checked>
                    <label for="jar">JAR</label>
                    <input type="radio" id="war" name="packaging" value="war">
                    <label for="war">WAR</label>
                </div>
            </div>

            <div class="form-group">
                <label>Dependencies:</label>
                <button type="button" id="addDependenciesBtn" class="btn">Add Dependencies</button>
                <div id="selectedDependencies"></div>
            </div>

            <button type="submit" class="btn">Generate Project</button>
        </form>

        <div id="result"></div>
    </div>

    <!-- Modal for selecting dependencies -->
    <div id="dependencyModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Select Dependencies</h2>
            <div class="form-group">
                <input type="checkbox" id="springBoot" name="dependencies" value="Spring Boot">
                <label for="springBoot">Spring Boot</label><br>
                <input type="checkbox" id="web" name="dependencies" value="Web">
                <label for="web">Web</label><br>
                <input type="checkbox" id="dataJpa" name="dependencies" value="Data JPA">
                <label for="dataJpa">Data JPA</label><br>
                <input type="checkbox" id="security" name="dependencies" value="Security">
                <label for="security">Security</label><br>
                <!-- Add more checkboxes as needed -->
            </div>
            <button type="button" id="saveDependenciesBtn" class="btn">Add Selected Dependencies</button>
        </div>
    </div>
</body>
</html>
