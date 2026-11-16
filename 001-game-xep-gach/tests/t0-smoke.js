// game tải không lỗi, home hiện
module.exports = [{ name: 'smoke', post: async () => { if (!document.getElementById('home').classList.contains('show')) throw 'home không hiện'; } }];
