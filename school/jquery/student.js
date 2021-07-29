var students = [{ id: "23", name: "Ali İmran", surname: "Atabey", number: "190541004", age: "20", gpa: "2.85" },
{ id: "44", name: "Yunus", surname: "Atabey", number: "190541002", age: "21", gpa: "3.10" }]
$("#appId").hide();

$(document).ready(function () {
    getStudentList()
});
function getStudentList() {
    var student = "";
    $.each(students, function (key, obj) {
        student +=
            `
            <tr >               
                <td>  ${obj.id}  </td>
                <td>  ${obj.name} </td>
                <td>  ${obj.surname} </td>
                <td>  ${obj.number} </td>
                <td>  ${obj.age} </td>
                <td>  ${obj.gpa} </td>
                <td>   <input type=\'button\'value=\'Update\' onclick=\'onRowClick("${key}")\'> 
                 <input type=\'button\'value=\'Delete\' id=\'deletetwo   \' onclick=\'onRowDelete("${obj.id}")\'> </td>
            </tr>
        `
    })
    $("#studentList").html(student);
}

function onRowClick(index) {

    $("#textId").val(students[index].id);
    $('#textName').val(students[index].name);
    $('#textSurname').val(students[index].surname);
    $('#textNumber').val(students[index].number);
    $('#textAge').val(students[index].age);
    $('#textGpa').val(students[index].gpa);
}

function emptyForm() {

    $("#textId").val("");
    $('#textName').val("");
    $('#textSurname').val("");
    $('#textNumber').val("");
    $('#textAge').val("");
    $('#textGpa').val("");
}
function onRowDelete(id) {

    const index = students.findIndex(student => student.id === id)
    if (index !== -1) students.splice(index, 1)
    console.log(id);
    getStudentList()
}

function saveStudent() {
    if ($('#textId').val() === null || $('#textId').val() === "") addStudent()
    else updateStudent()
}

function addStudent() {
    var student = {
        id: parseInt(students[students.length - 1].id) + 1,
        name: $('#textName').val(),
        surname: $("#textSurname").val(),
        number: $("#textNumber").val(),
        age: $("#textAge").val(),
        gpa: $("#textGpa").val()
    }
    students.push(student)
    getStudentList()
    emptyForm()
}

function updateStudent() {
    var student = {
        id: $('#textId').val(),
        name: $('#textName').val(),
        surname: $("#textSurname").val(),
        number: $("#textNumber").val(),
        age: $("#textAge").val(),
        gpa: $("#textGpa").val()
    }
    let index = students.findIndex(student => student.id === $('#textId').val())
    students.splice(index, 1, student)
    getStudentList()
    emptyForm()
}