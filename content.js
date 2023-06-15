function resultCopy() {
	// titleタグの内容とアクティブなページのurlを取得
	let title = document.querySelector("title");
	let url = window.location;

	// タイムスタンプの作成
	let week = ["日", "月", "火", "水", "木", "金", "土"];
	let timedata = new Date();
	let year = timedata.getFullYear();
	let month = timedata.getMonth() + 1;
	let date = timedata.getDate();
	let day = timedata.getDay();
	let hour = timedata.getHours();
	let minute = timedata.getMinutes();
	let seconds = timedata.getSeconds();
	let time_stamp = `${year}/${month}/${date}(${week[day]}) ${hour}時${minute}分${seconds}秒`;

	// 出力するリザルトメッセージ
	let result_message = `${title.innerText}\n${url}\n${time_stamp}\n\n`;

	// リザルトメッセージをアラートダイアログで表示しつつ内容をクリップボードにコピーする
	navigator.clipboard.writeText(result_message).then(function() {
		alert(`以下の内容をコピーしました\n${result_message}`);
	}).catch(function(error) {
		alert(`${error.message}\nコピーに失敗しました`);
	});
};

// 拡張機能をアイコンとしてツールバーに表示してアイコンクリックと同時に機能を実行する
chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target : { tabId: tab.id },
		func : resultCopy,
	});
});