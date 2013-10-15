// Load the SDK asynchronously
//(function (d, s, id) {
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) { return; }
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/en_US/all.js";
//    fjs.parentNode.insertBefore(js, fjs);
//}(document, 'script', 'facebook-jssdk'));

$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

(function (d, debug) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ false));

window.fbAsyncInit = function ()
{
    // init the FB JS SDK
    FB.init({
        appId: '645996468767674',                        // App ID from the app dashboard
        //channelUrl: 'http://localhost:4795/Home/Default', // Channel file for x-domain comms
        channelUrl: 'http://54.200.90.110/TAPD/Home/Default', // Channel file for x-domain comms
        status: true,                                 // Check Facebook Login status
        xfbml: true,                                 // Look for social plugins on the page
        scope: 'id,name,gender,user_birthday,email'
    });
};

function login() {
    // Additional initialization code such as adding Event Listeners goes here
    FB.login(function (response) {
        if (response.authResponse) {
            FB.api('/me', function (response) {
                createFBUser(response.email, '', response.first_name, response.last_name, response.gender, 'FBU');
            });

        } else {
            // alert('access not given');......
        }

    }, { 'scope': 'email' });
}
//For Facebook User Creation
function createFBUser(e, p, f, l, g, ut) {
    $("#signup").block({
        message: 'Processing'
    });
    $.ajax({
        data: "{'UserName':'" + e + "','UserType':'" + ut + "','EmailId':'" + e + "','Password':'" + p + "','FirstName':'" + f + "','LastName':'" + l + "','Gender':'" + g + "'}",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "/api/User/CreateUser",
        success: function (data) {
            alert(data);
            //alert('User created successfully, Please check your email to confirm your registration.');
        },
        error: function (a, b, c) { alert("Error: " + a); }
    });
}

//For Normal(Student) User Creation
function SaveUser(usrname, usertype, usrPass)
{
    $("#signup").block({
        message: 'Processing'
    });

    $.ajax({
        data: "{'UserName':'" +usrname+"','UserType':'" + usertype + "','EmailId':'" + usrname + "','Password':'" + usrPass + "'}",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "/api/User/CreateUser",
        success: function (data) {
            //alert(data.UserId);
            $("#signup").unblock();
            $("#username").val('');
            $("#password").val('');
            $("#confirmpassword").val('');
            $("#agreeU").prop('checked', false);
         
            alert(data);
            //alert('User created successfully, Please check your email to confirm your registration.',false);
           

        },
        error: function (a, b, c)
        {
            alert("Error: " + a); $("#signup").unblock();
            $("#username").val('');
            $("#password").val('');
            $("#confirmpassword").val('');
            $("#agreeU").prop('checked', false);
        }
    });
}

function SaveCompany(Cpmany_Name, Cpmany_User_First_Name, Cpmany_User_Last_Name, Cpmany_Email, Cpmany_Phone, Cpmany_Password)
{
    $("#company-signup").block({
        message: 'Processing'
    });

    $.ajax({
        data: "{'CompanyName':'" + Cpmany_Name + "','FirstName':'" + Cpmany_User_First_Name + "','LastName':'" + Cpmany_User_Last_Name + "','Email':'" + Cpmany_Email + "','Phone':'"+Cpmany_Phone+"','Password':'"+Cpmany_Password+"'}",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "/api/Company/CreateCompany",
        success: function (data) {
            $("#company-signup").unblock();
            $("#companyname").val('');
            $("#firstname").val('');
            $("#lastname").val('');
            $("#email").val('');
            $("#phone").val('');
            $("#cpassword").val('');
            $("#cconfirmpassword").val('');
            $("#agreeC").prop('checked', false);
            alert(data);
        },
        error: function (a, b, c) {
            alert("Error: " + a); $("#company-signup").unblock();
            $("#companyname").val('');
            $("#firstname").val('');
            $("#lastname").val('');
            $("#email").val('');
            $("#phone").val('');
            $("#cpassword").val('');
            $("#cconfirmpassword").val('');
            $("#agreeC").prop('checked', false);
        }
    });
}

function ValidateUser(e, p, ut) {
    $.ajax({
        data: "{'UserType':'" + ut + "','EmailId':'" + e + "','Password':'" + p + "'}",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "/api/User/ValidateUser",
        success: function (data) {
           // alert(data);
            if (data == "CULogged In") {
                window.location.href = "/Company/CompanyDashboard";
            }
            else if (data == "ULogged In") {
                window.location.href = "/Student/StudentDashboard";
            }
        },
        error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function forgotpwd()
{
    var email = $('#txtresetpwd').val();
    var match_email = /^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@((([a-zA-z]+){1,250}))\.(([a-zA-z.]+){2,5})$/;
    var result = match_email.test(email);
    if (result) {
        $.ajax({
            data: "{'EmailId':'" + email + "'}",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            url: "/api/User/ForgotPassword",
            success: function (data) {
                alert(data);
            },
            error: function (a, b, c) {
                alert(a.responseText);
            }
        });
    }
    else {
        alert("Please enter a valid email address");
    }
}

function companyuserchangepwd(oldpwd, newpwd, type)
{
 

    $.ajax({
        data: "{'oldPass':'" + oldpwd+"','newPass':'"+newpwd+ "','type':'"+type+"'}",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "/api/User/Test",
        success: function (data) {
          
            $("#cmpcoldpass").val('');
            $("#cmpcnewpass").val('');
            $("#cmpcnewcpass").val('');
            alert(data);
        },
        error: function (a, b, c) {
          
            alert(a.responseText);
        }
    });
}

function Studentchangepwd(oldpwd, newpwd, type) {


    $.ajax({
        data: "{'oldPass':'" + oldpwd + "','newPass':'" + newpwd + "','type':'" + type + "'}",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "/api/User/Test",
        success: function (data) {

            $("#stucoldpass").val('');
            $("#stucnewpass").val('');
            $("#stucnewcpass").val('');
            alert(data);
        },
        error: function (a, b, c) {

            alert(a.responseText);
        }
    });
}


function companyUpdateInformation(CompName, FirstName, LastName, Phone) {


    $.ajax({
        data: "{'CompName':'" + CompName + "','FirstName':'" + FirstName + "','LastName':'" + LastName + "','Phone':'" + Phone + "'}",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "/api/User/UpdateCompanyInformation",
        success: function (data) {

            //$("#cmpcoldpass").val('');
            //$("#cmpcnewpass").val('');
            //$("#cmpcnewcpass").val('');
            alert(data);
        },
        error: function (a, b, c) {

            alert(a.responseText);
        }
    });
}


// to update student information

function studentUpdateInformation(stuUserName, stuSchoolEmail, stuSchoolName, stuFirstName, stuLastName, stuGradDate) {

   
    $.ajax({
        data: "{'UserName':'" + stuUserName + "','SchoolEmail':'" + stuSchoolEmail + "','School':'" + stuSchoolName + "','FirstName':'" + stuFirstName + "','LastName':'" + stuLastName + "','GraduationDate':'" + stuGradDate + "'}",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "/api/User/UpdateStudentInformation",
        success: function (data) {

            //$("#cmpcoldpass").val('');
            //$("#cmpcnewpass").val('');
            //$("#cmpcnewcpass").val('');
            alert(data);
        },
        error: function (a, b, c) {

            alert(a.responseText);
        }
    });
}


//function ValidationForUserSignUp()
//{
//    var val='';
//    var showerrmsg = true;
//    var msg = '';
   
//    //--------------------Verify Email
//    var match_email = /^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@((([a-zA-z]+){1,250}))\.(([a-zA-z]+){2,5})$/;
//    val = $("#User_Name").val();
//    if (val == '')
//    {
      
//        msg = 'Please enter email.';
//        result = false;
//    }
//    else
//    {
      
//        result = match_email.test(val);
//        msg = 'Email is not valid.';
//    }
//    if (result == false)
//    {
//        $("#User_Name").addClass("error");
//        if (showerrmsg == true)
//            alert(msg);
//        return false;
//    }
//    else {
//        $("#User_Name").removeClass("error");
//    }
//    //--------------------------------------------------

//    //------------------------------Verify Password-----
//    val = $("#User_Password").val();
//    if (val == '') {
      
//        msg = 'Please enter password.';
//        result = false;
//    }
//    if (result == false)
//    {
//        $("#User_Password").addClass("error");
//        if (showerrmsg == true)
//            alert(msg);
//        return false;
//    }
//    else {
//        $("#User_Password").removeClass("error");
//    }
//    //---------------------------------------------------

//    //------------------------------Confirm Password-----
//    val = $("#User_ConfirmPassword").val();
//    if (val == '') {
     
//        msg = 'Enter Confirm Password.';
//        result = false;
//    }
//    else {
//        if (val != $("#User_Password").val()) {
           
//            msg = 'Password doesnt match.';
//            result = false;
//        }
//    }

//    if (result == false) {
//        $("#User_ConfirmPassword").addClass("error");
//        if (showerrmsg == true)
//            alert(msg);
//        return false;
//    }
//    else {
//        $("#User_ConfirmPassword").removeClass("error");
//    }
//    //---------------------------------------------------


//    // ----- check box checked or not check------------
//    if ($("#agreementCHeckBox").is(':checked')) {
//        SaveUser($("#User_Name").val(), 'U', $("#User_Password").val());
//    }
//    else {
//        msg = 'Terms and Conditions must be agreed.';
//        $("#agreementCHeckBox").addClass("error");
//        alert(msg);
//        return false;
//    }

//    //---------------------

   
//}

////-------- for company signup
//function ValidationForCompanySignUp() {
//    var val = '';
//    var showerrmsg = true;
//    var msg = '';

//    // - company name
//    val = $("#Cpmany_Name").val();
//    if (val == '')
//    {
//        msg = 'Please enter Company Name.';
//        result = false;
//    }
//    if (result == false) {
//        $("#Cpmany_Name").addClass("error");
//        if (showerrmsg == true)
//            alert(msg);
//        return false;
//    }
//    else {
//        $("#Cpmany_Name").removeClass("error");
//    }
//    //--

//    // - company user first name
//    val = $("#Cpmany_User_First_Name").val();
//    if (val == '') {

//        msg = 'Please enter First Name.';
//        result = false;
//    }
//    if (result == false) {
//        $("#Cpmany_User_First_Name").addClass("error");
//        if (showerrmsg == true)
//            alert(msg);
//        return false;
//    }
//    else {
//        $("#Cpmany_User_First_Name").removeClass("error");
//    }
//    //--

//    // - company user last name
//    val = $("#Cpmany_User_Last_Name").val();
//    if (val == '') {

//        msg = 'Please enter Last Name.';
//        result = false;
//    }
//    if (result == false) {
//        $("#Cpmany_User_Last_Name").addClass("error");
//        if (showerrmsg == true)
//            alert(msg);
//        return false;
//    }
//    else {
//        $("#Cpmany_User_Last_Name").removeClass("error");
//    }
//    //--


//    //--------------------Verify Email
//    var r = $("#Cpmany_Name").val();
//    //var match_email = /^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@((([a-zA-z]+){1,250}))\.(([a-zA-z]+){2,5})$/;
//    var match_email = "/^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@"+r+"\.(([a-zA-z]+){2,5})$/";
//    val = $("#Cpmany_Email").val();
//    if (val == '') {
      
//        msg = 'Please enter email.';
//        result = false;
//    }
//    else {
      
//        result = match_email.test(val);
//        msg = 'Email is not valid.';
//    }
//    if (result == false) {
//        $("#Cpmany_Email").addClass("error");
//        if (showerrmsg == true)
//            alert(msg);
//        return false;
//    }
//    else {
//        $("#Cpmany_Email").removeClass("error");
//    }
//    //--------------------------------------------------

    


//    // ----- check box checked or not check------------
//    //if ($("#agreementCHeckBox").is(':checked')) {
//    //    SaveUser($("#User_Name").val(), 'U', $("#User_Password").val());
//    //}
//    //else {
//    //    msg = 'Terms and Conditions must be agreed.';
//    //    $("#agreementCHeckBox").addClass("error");
//    //    alert(msg);
//    //    return false;
//    //}

//    //---------------------


//}
//-----------------
