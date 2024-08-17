document.addEventListener("DOMContentLoaded", function() {
    var popup = document.getElementById("dependenciesPopup");
    var btn = document.getElementById("dependenciesBtn");
    var span = document.getElementsByClassName("close")[0];
    var addBtn = document.getElementById("addDependenciesBtn");
    var nextBtn = document.getElementById("nextBtn");
    var nextToOutputBtn = document.getElementById("nextToOutputBtn");
    var submitBtn = document.getElementById("submitBtn");
    var backToDependenciesBtn = document.getElementById("backToDependenciesBtn");
    var backToInputBtn = document.getElementById("backToInputBtn");
    var inputDetailsScreen = document.getElementById("inputDetailsScreen");
    var outputDetailsScreen = document.getElementById("outputDetailsScreen");

    // Open the popup
    btn.onclick = function() {
        popup.style.display = "block";
    }

    // Close the popup
    span.onclick = function() {
        popup.style.display = "none";
    }

    // Add selected dependencies
    addBtn.onclick = function() {
        var inputDependencies = document.querySelectorAll('.dependencies-input input[type="checkbox"]:checked');
        var outputDependencies = document.querySelectorAll('.dependencies-output input[type="checkbox"]:checked');
        var inputList = document.getElementById("inputDependenciesList");
        var outputList = document.getElementById("outputDependenciesList");

        // Clear existing lists
        inputList.innerHTML = '';
        outputList.innerHTML = '';

        // Add selected input dependencies to list
        inputDependencies.forEach(function(dep) {
            var li = document.createElement("li");
            li.textContent = dep.value;
            inputList.appendChild(li);
        });

        // Add selected output dependencies to list
        outputDependencies.forEach(function(dep) {
            var li = document.createElement("li");
            li.textContent = dep.value;
            outputList.appendChild(li);
        });

        popup.style.display = "none";
        document.getElementById("selectedDependencies").style.display = "block";
        nextBtn.style.display = "inline-block";
    }

    // Move to input dependencies details screen
    nextBtn.onclick = function() {
        document.getElementById("selectedDependencies").style.display = "none";
        document.getElementById("metadataScreen").style.display = "none";
        inputDetailsScreen.style.display = "block";
        populateInputTabs();
    }

    // Move to output dependencies details screen
    nextToOutputBtn.onclick = function() {
        inputDetailsScreen.style.display = "none";
        outputDetailsScreen.style.display = "block";
        populateOutputTabs();
    }

    // Back to dependencies selection
    backToDependenciesBtn.onclick = function() {
        inputDetailsScreen.style.display = "none";
        document.getElementById("selectedDependencies").style.display = "block";
        document.getElementById("metadataScreen").style.display = "block";
    }

    // Back to input dependencies details screen
    backToInputBtn.onclick = function() {
        outputDetailsScreen.style.display = "none";
        inputDetailsScreen.style.display = "block";
        populateInputTabs();
    }

    // Submit and capture all data in JSON format
    submitBtn.onclick = function() {
        var jsonData = {};

        // Capture input dependencies details
        var inputDependencies = {};
        if (document.getElementById("kafkaConsumerForm").style.display === "block") {
            inputDependencies["Kafka Consumer"] = {
                "Consumer ID": document.getElementById("consumerId").value,
                "Topic Name": document.getElementById("kafkaConsumerTopicName").value
            };
        }
        // Add more input dependencies here if needed

        // Capture output dependencies details
        var outputDependencies = {};
        if (document.getElementById("kafkaProducerForm").style.display === "block") {
            outputDependencies["Kafka Producer"] = {
                "Topic Name": document.getElementById("kafkaProducerTopicName").value,
                "Message": document.getElementById("kafkaProducerMessage").value
            };
        }
        if (document.getElementById("databaseForm").style.display === "block") {
            outputDependencies["Database"] = {
                "Table Name": document.getElementById("tableName").value,
                "Query": document.getElementById("databaseQuery").value
            };
        }
        // Add more output dependencies here if needed

        // Combine input and output dependencies into final JSON
        jsonData["Input Dependencies"] = inputDependencies;
        jsonData["Output Dependencies"] = outputDependencies;

        // Display the JSON data (for now, just log it)
        console.log(JSON.stringify(jsonData, null, 2));

        // Submit the JSON data to the server or handle it further
        // Example: update result section
        document.getElementById("selectedDependencies").innerHTML = "<pre>" + JSON.stringify(jsonData, null, 2) + "</pre>";
    }

    // Populate input dependency tabs and handle tab clicks
    function populateInputTabs() {
        var inputDependencies = document.querySelectorAll("#inputDependenciesList li");
        var inputTabs = document.getElementById("inputTabs");

        inputTabs.innerHTML = '';

        inputDependencies.forEach(function(dep) {
            var li = document.createElement("li");
            li.textContent = dep.textContent;
            li.onclick = function() {
                document.querySelectorAll(".form-content").forEach(function(form) {
                    form.style.display = "none";
                });
                if (dep.textContent === "Kafka Consumer") {
                    document.getElementById("kafkaConsumerForm").style.display = "block";
                } else if (dep.textContent === "REST") {
                    document.getElementById("restForm").style.display = "block";
                }
                inputTabs.querySelectorAll("li").forEach(function(tab) {
                    tab.classList.remove("active");
                });
                li.classList.add("active");
            }
            inputTabs.appendChild(li);
        });

        // Trigger the first tab click
        if (inputTabs.querySelector("li")) {
            inputTabs.querySelector("li").click();
        }
    }

    // Populate output dependency tabs and handle tab clicks
    function populateOutputTabs() {
        var outputDependencies = document.querySelectorAll("#outputDependenciesList li");
        var outputTabs = document.getElementById("outputTabs");

        outputTabs.innerHTML = '';

        outputDependencies.forEach(function(dep) {
            var li = document.createElement("li");
            li.textContent = dep.textContent;
            li.onclick = function() {
                document.querySelectorAll(".form-content").forEach(function(form) {
                    form.style.display = "none";
                });
                if (dep.textContent === "Kafka Producer") {
                    document.getElementById("kafkaProducerForm").style.display = "block";
                } else if (dep.textContent === "Database") {
                    document.getElementById("databaseForm").style.display = "block";
                }
                outputTabs.querySelectorAll("li").forEach(function(tab) {
                    tab.classList.remove("active");
                });
                li.classList.add("active");
            }
            outputTabs.appendChild(li);
        });

        // Trigger the first tab click
        if (outputTabs.querySelector("li")) {
            outputTabs.querySelector("li").click();
        }
    }
});
