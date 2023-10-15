function addRow() {
    const name = document.getElementById("name").value;
    const choice = document.getElementById("choice").value;

    if (name && choice) {
        const data = { name, choice }; // יצירת אובייקט עם הנתונים

        fetch('add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // שליחת האובייקט בצורת JSON בגוף הבקשה
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // מציג את התשובה מהשרת בקונסול
                displaySavedRows();
            });
    }
}

function displaySavedRows() {
    fetch('data')
        .then(response => response.json())
        .then(rowsData => {
            var table = document.getElementById("dataTable");
            table.innerHTML = ""; // נקה את הטבלה לפני הצגת הנתונים המעודכנים


            // הוספת שאר הנתונים, אם יש
            rowsData.reverse();
            if (rowsData.length > 0) {
                rowsData.forEach(rowData => {
                    var newRow = table.insertRow(table.rows.length);
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    var cell3 = newRow.insertCell(2);
                    var cell4 = newRow.insertCell(3);
                    cell1.innerHTML = rowData.name;
                    cell2.innerHTML = rowData.choice;
                    cell3.innerHTML = rowData.date;
                    cell4.innerHTML = rowData.time;
                });
            }
        });
}

displaySavedRows();


