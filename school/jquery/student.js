var student = []
$(document).ready(function () {
    getStudentList()
    getSchoolPull()
});
function getStudentList() {
    $.getJSON("http://localhost:8080/students").done(function (data) {
        console.log(data)
        students = data
        var student = "";
        $.each(students, function (key, obj) {
            student +=
                `
            <tr >               
                <td class="table-warning">  ${obj.id}  </td>
                <td class="table-warning">  ${obj.name} </td>
                <td class="table-warning">  ${obj.surname} </td>
                <td class="table-warning">  ${obj.number} </td>
                <td class="table-warning">  ${obj.age} </td>
                <td class="table-warning">  ${obj.gpa} </td>
                <td class="table-warning">  ${obj.school.name} </td>
                <td class="table-warning">   <input type=\'button\'value=\'Update\'id=\'update\'class= \'btn btn-info \' onclick=\'onRowClick("${key}")\'> 
                 <input type=\'button\'value=\'Delete\'class= \'btn btn-danger\' id=\'delete   \' onclick=\'onRowDelete("${obj.id}")\'> </td>
            </tr>
        `
        })
        $("#studentList").html(student);
    });
}
function getSchoolPull() {
    $.getJSON("http://localhost:8080/schools").done(function (data) {
        console.log(data)
        students = data
        var school = `<option >SEÇİNİZ</option>`;
        $.each(students, function (key, obj) {
            school +=
                `<option value=\"${obj.id}\">${obj.name}</option>`
            $("#selectId").html(school);
        });
    })
}
function onRowClick(index) {
    $("#textId").val(students[index].id);
    $('#textName').val(students[index].name);
    $('#textSurname').val(students[index].surname);
    $('#textNumber').val(students[index].number);
    $('#textAge').val(students[index].age);
    $('#textGpa').val(students[index].gpa);
    $('#selectId').val(students[index].school.id);
}
function emptyForm() {
    $("#textId").val("");
    $('#textName').val("");
    $('#textSurname').val("");
    $('#textNumber').val("");
    $('#textAge').val("");
    $('#textGpa').val("");
    $('#selectId').val("SEÇİNİZ");
}
function onRowDelete(id) {
    var student = { id: id };
    console.log(id);
    $.ajax({
        url: 'http://localhost:8080/students?id=' + student.id,
        type: 'DELETE',
        success: function () {
            alert('record has been deleted');
            getStudentList();
            emptyForm();
        },
        error: function (error) { alert(error); }
    });
}
function saveStudent() {
    if ($('#textId').val() === null || $('#textId').val() === "") addStudent()
    else updateStudent()
}
function addStudent() {
    var student = { name: $('#textName').val(), surname: $("#textSurname").val(), number: $("#textNumber").val(), age: $("#textAge").val(), gpa: $("#textGpa").val(), school: { id: $("#selectId").val() } }
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/students",
        data: JSON.stringify(student),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data), $("#selectId").val(data.school.id), getStudentList()
        },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
    window.location.href = "http://127.0.0.1:5501/html/deneme2.html?#";
    window.location.reload();
    emptyForm()
}
function updateStudent() {
    var student = {
        id: $('#textId').val(), name: $('#textName').val(), surname: $("#textSurname").val(), number: $("#textNumber").val(), age: $("#textAge").val(), gpa: $("#textGpa").val(), school: { id: $("#selectId").val() }
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/students/" + student.id,
        data: JSON.stringify(student),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () { getStudentList() },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
    emptyForm()
}