// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function login()
{
   // alert('hi');
    window.fbAsyncInit = function () {
        // init the FB JS SDK

        FB.init({
            appId: '645996468767674',                        // App ID from the app dashboard
            channelUrl: '//localhost:4795/Home/Default', // Channel file for x-domain comms
            status: true,                                 // Check Facebook Login status
            xfbml: true,                                 // Look for social plugins on the page
            scope: 'id,name,gender,user_birthday,email'
        });

        // Additional initialization code such as adding Event Listeners goes here
        FB.login(function (response) {
            if (response.authResponse) {
                FB.api('/me', function (response) {
                    //alert('Your name is ' + response.name);
                    //alert(response.first_name);
                    //alert(response.email);
                    //alert(response.gender);
                    //alert(response.user_education_history);
                    //alert(response.user_about_me);
                   // alert(response.last_name);
                    //jQuery('#txtFirstName').val(response.first_name);
                    //jQuery('#txtLastName').val(response.last_name);
                    //jQuery('#txtEmail').val(response.email);
                    //jQuery('#hdfUID').val(response.id);

                    createUser(response.email, '', response.first_name, response.last_name,response.gender, 'FBU');

                });

            } else {
                    // alert('access not given');......
            }

        }, { 'scope': 'email' });


        //For Facebook User Creation
        function createUser(e, p, f, l,g, ut) {
            $.ajax({
                data: "{'UserName':'" + e + "','UserType':'" + ut + "','EmailId':'" + e + "','Password':'" + p + "','FirstName':'" + f + "','LastName':'" + l+"','Gender':'"+g+ "'}",
                type: "POST",
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                url: "/api/User",
                success: function (data) {
                    //alert(data.UserId);
                    alert('User created successfully, Please check your email to confirm your registration.');
                },
                error: function (a, b, c) { alert("Error: " + a); }
            });
        }

    };


}

//For Normal(Student) User Creation
function SaveUser(usrname, usertype, usrPass) {
    alert('Calling Save User');
    $.ajax({
        data: "{'UserType':'" + usertype + "','EmailId':'" + usrname + "','Password':'" + usrPass + "'}",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "/api/User",
        success: function (data) {
            //alert(data.UserId);
            alert('User created successfully, Please check your email to confirm your registration.', false);
        },
        error: function (a, b, c) { alert("Error: " + a); }
    });
}

function ValidationForUserSignUp()
{
    var val='';
    var showerrmsg = true;
    var msg = '';
   
    //--------------------Verify Email
    var match_email = /^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@((([a-zA-z]+){1,250}))\.(([a-zA-z]+){2,5})$/;
    val = $("#User_Name").val();
    if (val == '')
    {
        msg = 'Please enter email.';
        result = false;
    }
    else
    {
        result = match_email.test(val);
        msg = 'Email is not valid.';
    }
    if (result == false)
    {
        $("#User_Name").addClass("error");
        if (showerrmsg == true)
            alert(msg);
        return false;
    }
    else {
        $("#User_Name").removeClass("error");
    }
    //--------------------------------------------------

    //------------------------------Verify Password-----
    val = $("#User_Password").val();
    if (val == '') {
        msg = 'Please enter password.';
        result = false;
    }
    if (result == false)
    {
        $("#User_Password").addClass("error");
        if (showerrmsg == true)
            alert(msg);
        return false;
    }
    else {
        $("#User_Password").removeClass("error");
    }
    //---------------------------------------------------

    //------------------------------Confirm Password-----
    val = $("#User_ConfirmPassword").val();
    if (val == '') {
        msg = 'Enter Confirm Password.';
        result = false;
    }
    else {
        if (val != $("#User_Password").val()) {
            msg = 'Password doesnt match.';
            result = false;
        }
    }

    if (result == false) {
        $("#User_ConfirmPassword").addClass("error");
        if (showerrmsg == true)
            alert(msg);
        return false;
    }
    else {
        $("#User_ConfirmPassword").removeClass("error");
    }
    //---------------------------------------------------

    SaveUser($("#User_Name").val(), 'U', $("#User_Password").val());
}