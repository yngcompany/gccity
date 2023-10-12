var today = new Date(); 
var date = new Date(); 
function prevCalendar() { 



today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
buildCalendar();  
}

function nextCalendar() { 
    
    
    
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    buildCalendar(); 
}
function buildCalendar(){ 
var doMonth = new Date(today.getFullYear(),today.getMonth(),1);
    
    
    
    
var lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
    
    
    
    
var tbCalendar = document.getElementById("calendar");
    
var tbCalendarYM = document.getElementById("tbCalendarYM");
    
    
    
    tbCalendarYM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; 
while (tbCalendar.rows.length > 2) {
    
    
        tbCalendar.deleteRow(tbCalendar.rows.length-1);
        
    
    }
    var row = null;
    row = tbCalendar.insertRow();
    
    var cnt = 0; 
    
    for (i=0; i<doMonth.getDay(); i++) {
        cell = row.insertCell(); 
        cnt = cnt + 1; 
    }

    for (i=1; i<=lastDate.getDate(); i++) { 
    
        cell = row.insertCell(); 
        cell.innerHTML = i; 
        cnt = cnt + 1; 
    if (cnt % 7 == 1) {
        
        
    cell.innerHTML = "<font color=#f83b36>" + i
    
}    
    if (cnt%7 == 0){
        
        cell.innerHTML = "<font color=#355fe1>" + i
        
        row = calendar.insertRow();
        
    }
    
    if (today.getFullYear() == date.getFullYear()
    && today.getMonth() == date.getMonth()
    && i == date.getDate()) {
    
    
    cell.bgColor = "#fff"; 
    cell.style.color="#f83b36";
    cell.style.fontWeight="bold";
    cell.style.borderRadius="50% 50%";
    $('tbody').addClass('cf');
    }
    }
}
