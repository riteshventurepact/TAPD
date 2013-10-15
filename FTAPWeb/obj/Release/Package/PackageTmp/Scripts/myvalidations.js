
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

$.validator.addMethod("maxlength", function (value, element, len) {
    return value == "" || value.length <= len;
});

$(document).ready(function() 
{
    // validate the comment form when it is submitted
    //$("#CompanySignupForm").validate();
    //$("#UserSignUpForm").validate();

    $('#usersignup').click(function () {
        if ($("#UserSignUpForm").valid()) {
            if ($("#agreeU").is(':checked')) {
                SaveUser($('#username').val(), 'U', $('#password').val());
            }
            else {
                alert('Accept Terms and Conditions to continue.');
            }
        }
    });

    $('#companysignup').click(function () {
        if ($("#CompanySignupForm").valid())
        {
            if ($("#agreeC").is(':checked'))
            {

                /*var email = $('#companyname').val();
                email = email.replace(' ', '');
                email = email.toLocaleLowerCase();
                var regex = new RegExp("^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@(" + email + ").(([a-zA-z]+){2,5})$");
                var result = regex.test($("#email").val());
                if (result)
                {*/
                    SaveCompany($('#companyname').val(), $('#firstname').val(), $('#lastname').val(), $('#email').val(), $('#phone').val(), $('#cpassword').val())
                /*}
                else
                {
                    alert('Email id should be of Company Name specified.');
                }*/

            }
            else {
                alert('Accept Terms and Conditions to continue.');
            }
        }
    });


    // code to change company password

  

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
                minlength: 3,
                maxlength:50,
                email2: true,
                alphanumeric: false
            },
            password: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            confirmpassword: {
                required: true,
                minlength: 5,
                maxlength: 50,
                equalTo: "#password"
            },
            messages: {
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters",
                    maxlength: "Your usernamef must be less than 50 characters.",
                    email2: "Your Email Address must be in the format name@domain.com",
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    maxlength: "Your password must be less than 50 characters."
                },
                confirmpassword: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    maxlength: "Your password must be less than 50 characters.",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address"
            }
        }
        ,
        //agreeU: "Please accept our policy",
        errorClass: 'error',
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element)
        {

            $(element).removeClass();
            ////offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');
            error.addClass('error_outr');  // add a class to the wrapper
            error.insertAfter(element);
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });

    // validate signup form on keyup and submit
    $("#CompanySignupForm").validate({
        rules: {
            companyname: {
                required: true,
                minlength: 3,
                maxlength:50
            },
            firstname: {
                required: true,
                minlength: 2,
                maxlength:50,
                lettersonly: true
            },
            lastname: {
                required: true,
                minlength: 2,
                maxlength:50,
                lettersonly: true
            },
            username: {
                required: true,
                minlength: 5,
                maxlength: 50,
                email2:true
            },
            cpassword: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            cconfirmpassword: {
                required: true,
                minlength: 5,
                maxlength: 50,
                equalTo: "#cpassword"
            },
            email: 
                {
                    minlength: 5,
                    required: true,
                    email2: true
            },
            phone: {
                required: true,
                minlength: 5,
                maxlength:11,
                phoneUS: true
            }//,
           // agree: "required"
        }
        ,
        messages: {
            companyname:
                {
                    required: "Please enter your firstname",
                    minlength: "Your companyname must consist of at least 3 characters",
                    maxlength: "Your company must be less than 50 characters."
                },
            firstname:
                {
                    required: "Please enter your firstname",
                    lettersonly: "Please enter a valid firstname",
                    maxlength: "Your first name must be less than 50 characters."
                },
            lastname:
                {
                    required: "Please enter your lastname",
                    lettersonly: "Please enter a valid lastname",
                    maxlength: "Your last name must be less than 50 characters."
                },
            username: {
                required: "Please enter a username",
                minlength: "Your email must consist of at least 5 characters",
                maxlength: "Your email must be less than 50 characters.",
                email2: "Your Email Address must be in the format name@domain.com"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                maxlength: "Your password must be less than 50 characters."
            },
            confirmpassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                maxlength: "Your password must be less than 50 characters.",
                equalTo: "Please enter the same password as above"
            },
            email:
                {
                    required:"Please enter a valid email address",
                    minlength: "Your username must consist of at least 5 characters",
                    email2: "Your Email Address must be in the format name@domain.com"
                },
            phone:
                "Please enter a valid phone number",
            agree: "Please accept our policy"
        }
        ,
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element)
        {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');
            error.addClass('error_outr');  // add a class to the wrapper
            error.insertAfter(element);

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
                email2: true
            },
            cmpassword: {
                required: true,
                minlength: 5,
                maxlength: 50
            }
        },
        messages: {
            cmemail: "Please enter a valid email address",
            cmpassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                maxlength: "Your password must be less than 50 characters."
            }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');

            error.addClass('error_outr');  // add a class to the wrapper
            error.insertAfter(element);

            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });

    $('#UserLoginForm').validate({
        rules: {
            uemail:
            {
                required: true,
                email2: true
            },
            upassword:
            {
                required: true,
                minlength: 5
            }
        },
        messages: {
            uemail:
                {
                    required:"Please enter email address",
                    email2:"Please enter a valid email address"
                },
            upassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');

            error.addClass('error_outr');  // add a class to the wrapper
            error.insertAfter(element);

            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });


      $('#compPassChange').click(function () {
          if ($('#companychangepassword').valid()) {
              ChangeUserPassword($('#cmpcoldpass').val(), $('#cmpcnewpass').val());
        }
      });

    // code to validate company change password page
      $('#companychangepassword').validate({
        rules: {
            cmpcoldpass:
                {
                required: true
                
            },
            cmpcnewpass: {
                required: true,
                minlength: 5,
                maxlength: 50
                
            },
            cmpcnewcpass: {
                required: true,
                minlength: 5,
                maxlength: 50,
                equalTo: "#cmpcnewpass"
            }
        },
        messages: {
            cmpcoldpass: "Please enter your old password",
            cmpcnewpass: {
                required: "Please provide a New password",
                minlength: "Your New password must be at least 5 characters long",
                maxlength: "Your New password must be less than 50 characters.",
                cmpcnewcpass: {
                    required: "Please provide confirm password",
                    minlength: "Your confirm password must be at least 5 characters long",
                    maxlength: "Your confirm password must be less than 50 characters.",
                    equalTo: "Please enter the same password as above"
                }
            }
        },
        errorElement: "div",
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            ///offset = element.offset();
            //error.insertBefore(element)
            ///error.css('display', 'none');

            error.addClass('error_outr');  // add a class to the wrapper
            error.insertAfter(element);

            //error.addClass('message');  // add a class to the wrapper
            //error.css('position', 'absolute');
            //error.css('left', offset.left + element.outerWidth());
            //error.css('top', offset.top);
        }
    });


});
