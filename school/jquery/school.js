var schools = []
$(document).ready(function () {
    getSchoolList()
});
function getSchoolList() {
    $.getJSON("http://localhost:8080/schools").done(function (data) {
        console.log(data)
        schools = data
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
    $('#checkActive').val(schools[index].active);
}
function emptyForm() {
    $("#textId").val("");
    $('#textName').val("");
    $('#textCode').val("");
    $('#checkActive').val("");
}
function onRowDelete(id) {
    var school = { id: id };
    console.log(id);
    $.ajax({
        url: 'http://localhost:8080/schools?id=' + school.id,
        type: 'DELETE',
        success: function () {
            alert('record has been deleted');
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
        url: "http://localhost:8080/schools",
        data: JSON.stringify(school),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert("sadasd")
            getSchoolList()
        },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
    window.location.href = "http://127.0.0.1:5501/html/deneme.html?#";
    window.location.reload();
    emptyForm()
}
function updateSchool() {
    var school = { id: $('#textId').val(), name: $('#textName').val(), code: $("#textCode").val(), active: $("#checkActive").is(':checked') }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/schools/" + school.id,
        data: JSON.stringify(school),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () { getSchoolList() },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
}





