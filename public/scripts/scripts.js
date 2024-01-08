
        // Add JavaScript to handle the form submission
        document.getElementById('foodForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            var formData = {
                // Remove the userref field and let the server populate it
                foodName: document.getElementsByName('foodName')[0].value,
                calories: document.getElementsByName('calories')[0].value,
                notes: document.getElementsByName('notes')[0].value
            };
            fetch('/add-food', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Alert the result
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });


        function fetchAndDisplayFoodRecords() {
            fetch('/get-food-records')
            .then(response => response.json())
            .then(foodRecords => {
                const tableBody = document.getElementById('foodRecordsTable').getElementsByTagName('tbody')[0];
                tableBody.innerHTML = ''; // Clear existing table data

                // Populate the table with food records
                foodRecords.forEach(record => {
                    let row = tableBody.insertRow();
                    row.insertCell(0).textContent = record.foodname;
                    row.insertCell(1).textContent = record.calories;
                    row.insertCell(2).textContent = record.notes;
                    row.insertCell(3).textContent = new Date(record.date).toLocaleString();
                });
            })
            .catch(error => console.error('Error fetching food records:', error));
        }

        // Call the function when the page loads
        document.addEventListener('DOMContentLoaded', fetchAndDisplayFoodRecords);
    
