
        // Add JavaScript to handle the form submission
        document.getElementById('foodForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            var formData = {
                // Remove the userref field and let the server populate it
                foodname: document.getElementsByName('foodname')[0].value,
                calories: document.getElementsByName('calories')[0].value,
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
        
                    let totalCalories = 0;
                    const today = new Date().setHours(0, 0, 0, 0);
        
                    // Populate the table with today's food records
                    foodRecords.forEach(record => {
                        const recordDate = new Date(record.date).setHours(0, 0, 0, 0);
                        if (recordDate === today) {
                            let row = tableBody.insertRow();
                            row.insertCell(0).textContent = record.foodname;
                            row.insertCell(1).textContent = record.calories;
                            row.insertCell(2).textContent = new Date(record.date).toLocaleString();
        
                            // Add to total calories
                            totalCalories += parseInt(record.calories);
                        }
                    });
        
                    // Add total row for today's records
                    let totalRow = tableBody.insertRow();
                    totalRow.insertCell(0).textContent = 'Total';
                    totalRow.insertCell(1).textContent = totalCalories;
                    totalRow.insertCell(2); // Empty cell
        
                    // Style the total row if needed
                    totalRow.style.fontWeight = 'bold';
        
                })
                .catch(error => console.error('Error fetching food records:', error));
        }
        
        // Call the function when the page loads
        document.addEventListener('DOMContentLoaded', fetchAndDisplayFoodRecords);
        


// Add JavaScript to handle the journal form submission
document.getElementById('journalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var formData = {
        title: document.getElementsByName('title')[0].value,
        journalNotes: document.getElementsByName('journalNotes')[0].value
    };
    fetch('/add-journal', {
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

function fetchAndDisplayJournalEntries() {
    fetch('/get-journal-entries')
        .then(response => response.json())
        .then(journalEntries => {
            const tableBody = document.getElementById('journalEntriesTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear existing table data

            const today = new Date().setHours(0, 0, 0, 0);

            // Populate the table with today's journal entries
            journalEntries.forEach(entry => {
                const entryDate = new Date(entry.date).setHours(0, 0, 0, 0);

                if (entryDate === today) {
                    let row = tableBody.insertRow();
                    row.insertCell(0).textContent = entry.title;
                    row.insertCell(1).textContent = entry.notes;
                    row.insertCell(2).textContent = new Date(entry.date).toLocaleString();
                }
            });
        })
        .catch(error => console.error('Error fetching journal entries:', error));
}



// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayJournalEntries);




 // Add JavaScript to handle the form submission
 document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var formData = {
        expenseName: document.getElementsByName('expenseName')[0].value,
        expenseAmount: document.getElementsByName('expenseAmount')[0].value,
    };
    fetch('/add-expense', {
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

function fetchAndDisplayExpenseRecords() {
    fetch('/get-expense-records')
        .then(response => response.json())
        .then(expenseRecords => {
            const tableBody = document.getElementById('expenseRecordsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear existing table data

            let totalAmount = 0;
            const today = new Date().setHours(0, 0, 0, 0);

            // Populate the table with today's expense records
            expenseRecords.forEach(record => {
                const recordDate = new Date(record.date).setHours(0, 0, 0, 0);

                if (recordDate === today) {
                    let row = tableBody.insertRow();
                    row.insertCell(0).textContent = record.expensename;
                    row.insertCell(1).textContent = record.expenseamount;
                    row.insertCell(2).textContent = new Date(record.date).toLocaleString();

                    // Add to total amount
                    totalAmount += parseFloat(record.expenseamount);
                }
            });

            // Add total row for today's expenses
            let totalRow = tableBody.insertRow();
            totalRow.insertCell(0).textContent = 'Total';
            totalRow.insertCell(1).textContent = totalAmount.toFixed(2);
            totalRow.insertCell(2); // Empty cell

            // Style the total row if needed
            totalRow.style.fontWeight = 'bold';
        

    })
    .catch(error => console.error('Error fetching expense records:', error));
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayExpenseRecords);




// Add JavaScript to handle the form submission
document.getElementById('exerciseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var formData = {
        // Remove the userref field and let the server populate it
        exercisename: document.getElementsByName('exercisename')[0].value,
        caloriesburned: document.getElementsByName('caloriesburned')[0].value,
        exercisetime: document.getElementsByName('exercisetime')[0].value,
    };
    fetch('/add-exercise', {
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


function fetchAndDisplayExerciseRecords() {
    fetch('/get-exercise-records')
        .then(response => response.json())
        .then(exerciseRecords => {
            const tableBody = document.getElementById('exerciseRecordsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear existing table data

            let totalCaloriesBurned = 0;
            const today = new Date().setHours(0, 0, 0, 0);

            // Populate the table with today's exercise records
            exerciseRecords.forEach(record => {
                const recordDate = new Date(record.date).setHours(0, 0, 0, 0);

                if (recordDate === today) {
                    let row = tableBody.insertRow();
                    row.insertCell(0).textContent = record.exercisename;
                    row.insertCell(1).textContent = record.caloriesburned;
                    row.insertCell(2).textContent = record.exercisetime;
                    row.insertCell(3).textContent = new Date(record.date).toLocaleString();

                    // Add to total calories burned
                    totalCaloriesBurned += parseInt(record.caloriesburned);
                }
            });

            // Add total row for today's exercises
            let totalRow = tableBody.insertRow();
            totalRow.insertCell(0).textContent = 'Total';
            totalRow.insertCell(1).textContent = totalCaloriesBurned;
            totalRow.insertCell(2); // Empty cell
            totalRow.insertCell(3); // Empty cell

            // Style the total row if needed
            totalRow.style.fontWeight = 'bold';
        })
        .catch(error => console.error('Error fetching exercise records:', error));
}



// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayExerciseRecords);

    
