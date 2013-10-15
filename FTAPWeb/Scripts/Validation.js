/*---------------------------------Javascript Code Starts Here-------------------------------*/

//Created By Ritesh Tandon
//For any queries contact riteshtandon23@gmail.com

//matches only characters, no special characters and range is from 3-50 characters
//var match_first_name = /^([a-zA-Z]+){3,50}$/;

//matches only characters, no special characters and range is from 2-50 characters.
//Added the constraint of non required number after first name [space] [any number].
var match_first_name = /^(([a-zA-Z]+){3,50})(\s\S\d{0,1})?$/;

//matches only characters, no special characters and range is from 2-50 characters.
//Added the constraint of non required number after first name [space] [any number].
var match_last_name = /^(([a-zA-Z]+){3,50})(\s\S\d{0,1})?$/;

//matches email, no special characters and name range is 1 to 250 then domain characters are from 1 to 250 and (.in .com) i.e 2 to 3 characters can be there.
var match_email = /^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@((([a-zA-z]+){1,250}))\.(([a-zA-z]+){2,5})$/;

//matches phone number in the format (223) 323-3726 i.e (xxx) xxx-xxxx. Only 14 characters can be added
var match_phone = /^(\(\d{3}\)\s\d{3}\-\d{4})$/;

//matches the password the password can have special characters as well as numbers.
//var match_password = /^([a-zA-Z0-9@!#$%*&^.]{8,30})$/;

//matches the password having any string 4 to 8 characters
//var match_password = /^.{4,8}$/;

//matches the password expression that requires one lower case letter, one upper case letter, one digit, 6-33 length, and no spaces.
var match_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,33}$/;

//matches the height and can have numeric or decimal values in the range of xx.xx
var match_height = /^[0-9]{1,2}((\.)\d{0,2})?$/

//matches the height and can have numeric or decimal values in the range of xx.xx
var match_weight = /^[0-9]{1,3}((\.)\d{0,2})?$/

var count = 0;

function check(divname, showerrmsg) {
    var val = '';
    var result = true;
    var pwd = '';
    $("#" + divname + " form input").each(function (index, el)
    {
        if ($(el).attr('type') == 'checkbox')
        {
            if (($(el).attr('name').indexOf('agreementCheckBox') != -1))
            {
                if (!($(el).is(':checked')))
                {
                    msg = 'Terms and Conditions must be agreed.';
                    $("#agreementCHeckBox").addClass("error");
                    alert(msg);
                    return false;
                }
            }
        }
        else
        {

        val = $(el).val();
        if (($(el).attr('name').indexOf('FirstName') != -1) || ($(el).attr('name').indexOf('firstname') != -1) || ($(el).attr('placeholder').indexOf('First Name') != -1))
        {
            result = match_first_name.test(val);
            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true)
                    alert('Incorrect name format, Please enter more than 2 and less than 50 characters without any numbers, spaces or special characters.');

                return false;
            }
            else {
                $(el).removeClass("error");
            }
        }
        else if (($(el).attr('name').indexOf('CompanyName') != -1) || ($(el).attr('name').indexOf('companyname') != -1) || ($(el).attr('placeholder').indexOf('COMPANY NAME') != -1)) {
            result = match_first_name.test(val);
            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true)
                    alert('Incorrect name format, Please enter more than 2 and less than 50 characters without any numbers, spaces or special characters.');

                return false;
            }
            else {
                $(el).removeClass("error");
            }
        }
        else if (($(el).attr('name').indexOf('LastName') != -1) || ($(el).attr('name').indexOf('lastname') != -1) || ($(el).attr('placeholder').indexOf('Last Name') != -1)) {
            result = match_last_name.test(val);
            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true)
                    alert('Incorrect name format, Please enter more than 2 and less than 50 characters without any numbers, spaces or special characters.');

                return false;
            }
            else {
                $(el).removeClass("error");
            }
        }
        else if (($(el).attr('name').indexOf('Email') != -1) || ($(el).attr('name').indexOf('email') != -1) || ($(el).attr('placeholder').indexOf('Email') != -1))
        {
            var r = $("#Cpmany_Name").val();
            var regex = new RegExp("^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@(" + r + ")\.(([a-zA-z]+){2,5})$");
            //matches email, no special characters and name range is 1 to 250 then domain characters are from 1 to 250 and (.in .com) i.e 2 to 3 characters can be there.
            //var match_company_email = "/^((([a-zA-z]+(\.[a-zA-z0-9])?){1,250})(\d{0,30})?)\@("+r+")\.(([a-zA-z]+){2,5})$/";
            result = regex.test(val);
            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true)
                    alert('Please enter a valid email address.');

                return false;
            }
            else {
                $(el).removeClass("error");
            }
        }
        else if (($(el).attr('name').indexOf('UserName') != -1) || ($(el).attr('name').indexOf('UserName') != -1) || ($(el).attr('placeholder').indexOf('user name') != -1)) {
            result = match_email.test(val);
            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true)
                    alert('Please enter a valid email address.');

                return false;
            }
            else {
                $(el).removeClass("error");
            }
        }
        else if (($(el).attr('name').indexOf('Phone') != -1) || ($(el).attr('name').indexOf('phone') != -1) || ($(el).attr('placeholder').indexOf('Phone Number') != -1)) {
            result = match_phone.test(val);
            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true)
                    alert('Please enter valid US phone number. eg. (xxx) xxx-xxxx');

                return false;
            }
            else {
                if (val == "(000) 000-0000") {

                    if (showerrmsg == true)
                        alert("Invalid Phone Number");

                    $(el).addClass("error");
                    result = false;
                    return false;
                }
                else {
                    $(el).removeClass("error");
                }
            }
        }
        else if (($(el).attr('name').indexOf('ConfirmPassword') != -1) || ($(el).attr('name').indexOf('confirmpassword') != -1) || ($(el).attr('placeholder').indexOf('Confirm Password') != -1)) {
            result = match_password.test(val);
            if (val == pwd) {
                $(el).removeClass("error");

            }
            else {

                if (showerrmsg == true)
                    alert("Password Doesn't Match");


                result = false;
                $(el).addClass("error");


                return false;
            }
        }
        else if (($(el).attr('name').indexOf('Password') != -1) || ($(el).attr('name').indexOf('password') != -1) || ($(el).attr('placeholder').indexOf('Password') != -1)) {
            pwd = val;
            result = match_password.test(val);
            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true)
                    alert('Please enter valid password having 6 to 13 characters, One lower case letter, one upper case letter and one digit.');

                return false;
            }
            else {
                $(el).removeClass("error");
            }
        }
        else if (($(el).attr('name').indexOf('height') != -1) || ($(el).attr('name').indexOf('height') != -1) || ($(el).attr('placeholder').indexOf('Height') != -1)) {
            result = match_height.test(val);

            var msg = 'Please enter valid height. eg. xx.xx';
            if (result != false) {
                if (eval($(el).val()) <= 0) {
                    msg = 'Height cannot be zero.';
                    result = false;
                }
            }

            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true)
                    alert(msg);

                return false;
            }
            else {
                $(el).removeClass("error");
            }
        }
        else if (($(el).attr('name').indexOf('weight') != -1) || ($(el).attr('name').indexOf('weight') != -1) || ($(el).attr('placeholder').indexOf('Weight') != -1)) {
            result = match_weight.test(val);
            var msg = 'Please enter valid weight. eg. xxx.xx';
            if (result != false) {
                if (eval($(el).val()) <= 0) {
                    msg = 'Weight cannot be zero.';
                    result = false;
                }
            }

            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true) {
                    alert(msg);
                }


                return false;
            }
            else {
                $(el).removeClass("error");
            }
        }
        else if (($(el).attr('name').indexOf('registeration') != -1) || ($(el).attr('name').indexOf('Registeration') != -1) || ($(el).attr('placeholder').indexOf('Registeration Number') != -1)) {
            if ($(el).val().trim() == "")
                result = false;

            if (result == false) {
                $(el).addClass("error");

                if (showerrmsg == true)
                    alert('Please enter registeration number');

                return false;
            }
            else {
                $(el).removeClass("error");
            }
        }
        else if (($(el).attr('name').indexOf('image') != -1) || ($(el).attr('name').indexOf('FileUpload') != -1) || ($(el).attr('placeholder').indexOf('Picture') != -1)) {

            if (showerrmsg)
            {
                var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
                var oInput = $(el);

                //Check extension
                if ($(oInput).attr('type') == "file") {
                    var sFileName = $(oInput).val();
                    if (sFileName.length > 0 || $(el).attr('name') == "FileUpload1") {
                        var blnValid = false;
                        for (var j = 0; j < _validFileExtensions.length; j++) {
                            var sCurExtension = _validFileExtensions[j];
                            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                                blnValid = true;
                                break;
                            }
                        }
                        if (!blnValid) {
                            alert("Sorry, Please select a file, having extensions " + _validFileExtensions.join(", ") + " with a maximum size of 1MB.");
                            $(el).addClass("error");
                            result = false;
                            return false;
                        }
                        else {
                            $(el).removeClass("error");
                        }
                    }
                }

                //Check filesize
                if (window.FileReader)
                {
                    file = oInput.size;
                    size = file;
                    var files = document.getElementById($(el).attr('id')).files;
                    if (files[0].size > 1048576) {
                        alert('File size should be less than 1MB');
                        result = false;
                    }
                }
                }//end of if(showerrmsg)
            } 
        }// end of else
    });
    showerrmsg = false;
    return result;
}

function initialize(divname) 
{
    $("#" + divname + " form input").each(function (index, el) {

        if($(el).attr("type")!="file")
            $(el).bind("blur", function () { check(divname, false); });

        if($(el).attr("type")=="submit")
            $(el).bind("blur", function () { check(divname, true); });
    });

    $("#" + divname + " form input").each(function (index, el) {
        $(el).bind("keydown", function (event) { if (len($(el).val()) > $(el).attr('maxlength')) event.preventDefault(); });
    });
}
/*---------------------------------Javascript Code Ends Here-------------------------------*/
function startValidation(divname)
{
    $("#" + divname + " form input").each(function (index, el) {
        if (index == 0) {
            $(el).focus();
            initialize(divname);
        }
    });
    
}