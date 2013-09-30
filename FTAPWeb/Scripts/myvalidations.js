
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

$(document).ready(function() 
{
    // validate the comment form when it is submitted
    //$("#CompanySignupForm").validate();
    //$("#UserSignUpForm").validate();

    $('#usersignup').click(function () {
        if ($("#UserSignUpForm").valid()) {
            SaveUser($('#username').val(),'U',$('#password').val());
        }
    });

    $('#companysignup').click(function () {
        if ($("#CompanySignupForm").valid())
        {
            SaveCompany($('#companyname').val(), $('#firstname').val(), $('#lastname').val(), $('#email').val(), $('#phone').val(), $('#cpassword').val())
        }
    });

    $('#userlogin').click(function () {
        if ($('#UserLoginForm').valid())
        {
            ValidateUser($('#uemail').val(), $('#upassword').val(), 'U');
        }
    });

    $('#companylogin').click(function () {
        if ($('#CompanyLoginForm').valid())
        {
            ValidateUser($('#cmemail').val(), $('#cmpassword').val(), 'CU');
        }
    });

    $("#UserSignUpForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 2,
                email: true
            },
            cpassword: {
                required: true,
                minlength: 5
            },
            cconfirmpassword: {
                required: true,
                minlength: 5,
                equalTo: "#cpassword"
            },
            email: {
                required: true,
                email: true
            },
            agree: "required"
        }
        ,
        username: {
            required: "Please enter a username",
            minlength: "Your username must consist of at least 2 characters",
            email: true
        },
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
        },
        confirmpassword: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long",
            equalTo: "Please enter the same password as above"
        },
        email: "Please enter a valid email address"
        ,
        agree: "Please accept our policy",
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
        offset = element.offset();
        //error.insertBefore(element)
        error.css('display', 'none');
        //error.addClass('message');  // add a class to the wrapper
        //error.css('position', 'absolute');
        //error.css('left', offset.left + element.outerWidth());
        //error.css('top', offset.top);
    }
    });

    // validate signup form on keyup and submit
    $("#CompanySignupForm").validate({
        rules: {
            companyname: "required",
            firstname: "required",
            lastname: "required",
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            },
            confirmpassword: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
                //,
                //phoneUS: true
            },
            agree: "required"
        }
        ,
        messages: {
            companyname: "Please enter your firstname",
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            confirmpassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                equalTo: "Please enter the same password as above"
            },
            email: "Please enter a valid email address",
            phone: "Please enter a valid phone number",
            agree: "Please accept our policy"
        }
        ,
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            offset = element.offset();
            //error.insertBefore(element)
            error.css('display', 'none');
            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });


    $('#CompanyLoginForm').validate({
        rules: {
            cmemail:{
                required: true,
                email: true
            },
            cmpassword: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            cmemail: "Please enter a valid email address",
            cmpassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            offset = element.offset();
            //error.insertBefore(element)
            error.css('display', 'none');
            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });

    $('#UserLoginForm').validate({
        rules: {
            uemail: {
                required: true,
                email: true
            },
            upassword: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            uemail: "Please enter a valid email address",
            upassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            offset = element.offset();
            //error.insertBefore(element)
            error.css('display', 'none');
            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });


});
