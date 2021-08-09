var schools = []
var schoolSearch = { name: '', code: '' }
$(document).ready(function () {
    getSchoolList()
    searchSchool()
    clearForm()
});
function getSchoolList() {
    $.getJSON("http://localhost:8080/school/search/findBySchool?name=" + schoolSearch.name + "&code=" + schoolSearch.code).done(function (data) {
        console.log(data)
        schools = data._embedded.schools
        var school = "";
        $.each(schools, function (key, obj) {
            school +=
                `
            <tr >               
                <td class="table-warning">  ${obj.id}  </td>
                <td class="table-warning">  ${obj.name} </td>
                <td class="table-warning">  ${obj.code} </td>
                <td class="table-warning">  ${obj.active} </td>
                <td class="table-warning">   <input type=\'button\'value=\'Update\' class= \'btn btn-info \' onclick=\'onRowClick("${key}")\'> 
                 <input type=\'button\'value=\'Delete\' class= \'btn btn-danger\' id=\'delete   \' onclick=\'onRowDelete("${obj.id}")\'> </td>
            </tr>
        `
        })
        $("#schoolList").html(school);
    })
}
function onRowClick(index) {
    $("#textId").val(schools[index].id);
    $('#textName').val(schools[index].name);
    $('#textCode').val(schools[index].code);
    $('#checkActive').prop('checked', schools[index].active);
}
function emptyForm() {
    $("#textId").val("");
    $('#textName').val("");
    $('#textCode').val("");
    $('#checkActive').prop('checked', false);
}
function onRowDelete(id) {
    var school = { id: id };
    console.log(id);
    $.ajax({
        url: 'http://localhost:8080/school/' + school.id + '?' + school.id,
        type: 'DELETE',
        success: function () {
            alert('SUCCESSFULLY DELETED');
            getSchoolList();
            emptyForm();
        },
        error: function (error) { alert(error); }
    });
}
function saveSchool() {
    if ($('#textId').val() === null || $('#textId').val() === "") addSchool()
    else updateSchool()
}
function addSchool() {
    var school = { name: $('#textName').val(), code: $("#textCode").val(), active: $("#checkActive").is(':checked') }
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/school",
        data: JSON.stringify(school),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert("SUCCESSFULLY ADDED")
            getSchoolList()
        },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
    window.location.href = "http://127.0.0.1:5501/html/school.html?#";
    window.location.reload();
    emptyForm()
}
function updateSchool() {
    var school = { id: $('#textId').val(), name: $('#textName').val(), code: $("#textCode").val(), active: $("#checkActive").is(':checked') }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/school/" + school.id,
        data: JSON.stringify(school),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () { getSchoolList() },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
}
function searchSchool() {
    schoolSearch = { name: $("#searchName").val(), code: $("#searchCode").val() }
    getSchoolList()
}
function clearForm() {
    emptyForm()
}






