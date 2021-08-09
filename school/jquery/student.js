var student = []
var studentSearch = { name: '', surname: '', number: '', age: '', gpa: '', schoolName: '' }
$(document).ready(function () {
    getStudentList()
    getSchoolPull()
    searchStudent()
    clearForm()
});
function getStudentList() {
    $.getJSON("http://localhost:8080/student/search/findAllSearch?name=" + studentSearch.name + "&surname=" + studentSearch.surname + "&number=" + studentSearch.number + "&age=" + studentSearch.age + "&gpa=" + studentSearch.gpa + "&school=" + studentSearch.schoolName).done(function (data) {

        students = data._embedded.students
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
    $.getJSON("http://localhost:8080/school/search/findByActiveTrue").done(function (data) {

        students = data._embedded.schools
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
        url: 'http://localhost:8080/student/' + student.id + '?' + student.id,
        type: 'DELETE',
        success: function () {
            alert('SUCCESSFULLY DELETED');
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
    var student = { name: $('#textName').val(), surname: $("#textSurname").val(), number: $("#textNumber").val(), age: $("#textAge").val(), gpa: $("#textGpa").val() }

    student.school = $("#selectId")[0].selectedIndex == 0 ? null : { id: $("#selectId").val() }
    console.log(student)
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/student",
        data: JSON.stringify(student),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert("SUCCESSFULLY ADDED")
                , $("#selectId").val(data.school.id), getStudentList()
        },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
    emptyForm()
}
function updateStudent() {
    var student = {
        id: $('#textId').val(), name: $('#textName').val(), surname: $("#textSurname").val(), number: $("#textNumber").val(), age: $("#textAge").val(), gpa: $("#textGpa").val(), school: { id: $("#selectId").val() }
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/student/" + student.id,
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
function searchStudent() {
    studentSearch = { name: $("#searchName").val(), surname: $("#searchSurname").val(), number: $("#searchNumber").val(), age: $("#searchAge").val(), gpa: $("#searchGpa").val(), schoolName: $("#searchSchoolName").val() }
    getStudentList()
}
function clearForm() {
    emptyForm()
}




