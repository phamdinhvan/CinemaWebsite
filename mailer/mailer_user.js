let baseUrl = ""
let logo1 = ""
let webName = "Cinema Ticket"
const mailer = require('./mailer');
// let language = require('../../../language/language_routes');
// const defaultLanguage = language.defaultLanguage;

// exports.verifyEmailUser = function (userName, email, link, lang) {
//     let emailContent = getHeaderEmail(util.format(language.getLanguage('welcome_to_website', lang), ['EXT GROUP']))
//         + getContentVerifyEMail(language.getLanguage('xac_minh_dia_cho_email_cua_ban_click_vao_ben_duoi', lang), link, lang);
//     +getFooterEmail();

//     mailer(email, util.format(language.getLanguage('vui_long_xac_thuc_email_cua_ban', lang), [userName]), emailContent, function (callback) {
//     })
// };

exports.verifyEmailUserImplement = function(email, link) {

    // let emailContent = getHeaderEmail('XIN CHÀO')
    //     + getContentVerifyEMailImplement('XÁC MINH BẰNG ĐƯỜNG LINK BÊN DƯỚI', link);
    //     + getFooterEmail();
    let emailContent = link;

    mailer(email, 'VUI LÒNG XÁC THỰC EMAIL CỦA BẠN', emailContent, function(callback) {
        console.log(callback);
    })
};

exports.sendMailForgetPassword = (email, fullName, link) => {
    mailer(email, `XÁC NHẬN ĐỂ NHẬN MẬT KHẨU MỚI ${fullName}`, `nhấn vào link này ${link}`, function(callback) {
        console.log('_____________________________________')
        console.log(callback);
    });
}

exports.sendMailBookingTicket = (email, _mave, _maghe, _tenrap, _tenphim, _thoidiembatdau, _giatien) => {
    // let emailContent = getHeaderEmail('XIN CHÀO') +
    //     getContentTicket('THÔNG TIN VÉ', _mave, _maghe, _tenrap, _tenphim, _thoidiembatdau, _giatien); +
    // getFooterEmail();
    let emailContent = '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Mã Vé: ' + _mave + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Mã Ghế: ' + _maghe + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Tên Rạp: ' + _tenrap + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Tên Phim: ' + _tenphim + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Thời Điểm Đặt Vé: ' + _thoidiembatdau + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Giá Tiền: ' + _giatien + '</b>' +
        '<br>';
    mailer(email, 'XÁC NHẬN THÔNG TIN ĐẶT VÉ', emailContent, function(callback) {
        console.log('_____________________________________')
        console.log(callback);
    });
}

/** 
 * @Phim_Gui_Xac_Nhan_Dat_Ve
 */
exports.sendMailForgetPassword = (email, fullName, link) => {
    mailer(email, `XÁC NHẬN MẬT KHẨU MỚI ${fullName}`, `Nhấn vào link này ${link}`, function(callback) {
        console.log('_____________________________________')
        console.log(callback);
    });
}

/**
 * @param email email 
 * @param userName tên user
 * @param link link / gửi mail kèm link URL = `http://localhost:  ${port} /veryfi/${token}` token dùng để
 * đăng ký tài khoản
 * trường hợp `Quên Mật Khẩu` thì yêu cầu người dùng xác nhận email có tồn tại nếu 
 * tồn tại thì lấy token = user.token  gửi mail với `URL` là `http://localhost:  ${port} /khoi-phuc-tai-khoan/${token}`
 * chuyển đến  form password mới -> action -> update Password = Password mã hóa ứng với user đó
 * ngược lại thì cho đến trang đăng nhập 
 * 
 * thì chuyển đến trang  
 * @param type
 */
exports.resetPassAccount = (email, userName, link, type) => {

    let emailContent = getHeaderEmail((type === 1) ? "RESET PASSWORD" : "RESET SECOND PASSWORD") +
        getContentEmailResetPass(userName, baseUrl + link, type); +
    getFooterEmail();

    mailer(email, `${webName}: Reset password`, emailContent, function(callback) {});
};


function getHeaderEmail(title) {
    return '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head> ' +
        '<meta charset="UTF-8"> ' +
        '<title>Document</title>' +
        '</head>' +
        '<body>' +
        '<div class="gmail_quote"> ' +
        '<div style="margin:0px;background-color:#f4f3f4;font-family:Helvetica,Arial,sans-serif;font-size:12px" ' +
        'text="#444444" bgcolor="#F4F3F4" link="#21759B" ' +
        'alink="#21759B" vlink="#21759B" marginheight="0" ' +
        'marginwidth="0"> <table border="0" width="100%" ' +
        'cellspacing="0" cellpadding="0" bgcolor="#F4F3F4">' +
        ' <tbody>' +
        ' <tr>' +
        ' <td style="padding:15px"> ' +
        '<center> ' +
        '<table width="550" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff"> ' +
        '<tbody> ' +
        '<tr> ' +
        '<td align="left">' +
        '<div style="border:solid 1px #d9d9d9"> ' +
        '<table style="line-height:1.6;font-size:12px;font-family:Helvetica,Arial,sans-serif;border:solid 1px #ffffff;color:#444" ' +
        'border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff"> ' +
        '<tbody> <tr> <td style="color:#ffffff" ' +
        'colspan="2" valign="bottom" height="30">.</td>' +
        '</tr>' +
        '<tr> ' +
        '<td style="line-height:25px;padding: 10px 20px; text-align: center">' +
        '<a style="text-decoration:none" href="' + baseUrl + '" target="_blank" ' +
        'class="CToWUd">' +
        '<img style="width: 200px" src="' + logo1 + '">' +
        '</a>' +
        '<h1 style="color: #2e3192; font-size: 30px; margin-bottom: 40px; text-align: center">' + title + '</h1>' +
        '</td>' +
        '</tr>' +
        '</tbody> ' +
        '</table> ' +
        '<table style="margin-top:15px;margin-right:30px;margin-left:30px;color:#444;line-height:1.6;font-size:12px;' +
        'font-family:Arial,sans-serif" border="0" width="490" ' +
        'cellspacing="0" cellpadding="0" bgcolor="#ffffff"> ';
}

function getContentVerifyEMailImplement(message, link) {
    return '<tbody>' +
        '<tr>' +
        '<td style="border-top:solid 1px #d9d9d9" colspan="2"> ' +
        '<div style="padding:15px 0; line-height: 1.6;">' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + message + '</b>' +
        '<br>' +
        '<br><p style="text-align: center;"><a style="text-decoration: none; background: #2e3291; color: #fff; padding: 7px 25px; font-size: 15px; border-radius: 5px;" href="' + link + '">' + 'XAC NHAN DIA CHI MAIL' + '</a></p>' +
        '<br>' +
        '</div>' +
        '</td></tr></tbody>';
}

function getContentTicket(message, _mave, _maghe, _tenrap, _tenphim, _thoidiembatdau, _giatien) {
    return '<tbody>' +
        '<tr>' +
        '<td style="border-top:solid 1px #d9d9d9" colspan="2"> ' +
        '<div style="padding:15px 0; line-height: 1.6;">' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + message + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Mã Vé: ' + _mave + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Mã Ghế: ' + _maghe + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Tên Rạp: ' + _tenrap + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Tên Phim: ' + _tenphim + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Thời Điểm Đặt Vé: ' + _thoidiembatdau + '</b>' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + 'Giá Tiền: ' + _giatien + '</b>' +
        '<br>' +
        '<br>' +
        '</div>' +
        '</td></tr></tbody>';
}

function getContentVerifyEMail(message, link, lang) {
    return '<tbody>' +
        '<tr>' +
        '<td style="border-top:solid 1px #d9d9d9" colspan="2"> ' +
        '<div style="padding:15px 0; line-height: 1.6;">' +
        '<br><b style="font-size: 16px; text-align: center; display: block;">' + message + '</b>' +
        '<br>' +
        '<br><p style="text-align: center;"><a style="text-decoration: none; background: #2e3291; color: #fff; padding: 7px 25px; font-size: 15px; border-radius: 5px;" href="' + link + '">' + language.getLanguage('xac_nhan_dia_chi_email', lang) + '</a></p>' +
        '<br>' +
        '</div>' +
        '</td></tr></tbody>';
}

function getContentEmailResetPass(userName, link, type) {
    return '<tbody>' +
        '<tr>' +
        '<td style="border-top:solid 1px #d9d9d9" colspan="2"> ' +
        '<div style="padding:15px 0">' +
        '<p class="title" style="line-height: 1.7; font-size: 19px;">' + util.format(language.getLanguage((type === 1) ? 'reset_password_mail' : 'reset_second_password_mail', defaultLanguage), userName, link) + '</p>' +
        '<br>' +
        '</div>' +
        '</td></tr></tbody>';
}

function getFooterEmail() {
    return '</table> <table style="line-height:1.5;font-size:12px;font-family:Arial,' +
        'sans-serif;margin-right:30px;margin-left:30px" border="0" width="490" ' +
        'cellspacing="0" cellpadding="0" bgcolor="#ffffff"> ' +
        '<tbody> <tr style="font-size:11px;color:#999999">' +
        ' <td style="border-top:solid 1px #d9d9d9" colspan="2"> ' +
        '<div style="padding:15px 0"> This is automatic mailbox please do not Replied to this message! </div>' +
        '</td></tr><tr> <td style="color:#ffffff" colspan="2" height="15">.</td></tr></tbody> </table> ' +
        '</div></td></tr></tbody> </table> </center> </td></tr>' +
        '</tbody> </table> <div class="yj6qo"></div><div class="adL">' +
        '</div></div><div class="adL"></div></div></body></html>';
}