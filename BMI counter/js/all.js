//取得DOM
const elResultBtn = document.querySelector('.result-btn');
const elRecordArea = document.querySelector('.record-wrap');
const elShowbox = document.querySelector('.result-showBox');
const elBtnRefresh = document.querySelector('.btn-refresh');
const elBtnClear = document.querySelector('.btn-clear');
const elInputHeight = document.querySelector('.heightData');
const elInputWeight = document.querySelector('.weightData');

//取得localStorage的資料 若無則為空值
var dataAry = JSON.parse(localStorage.getItem('BMIrecord')) || [];

showData();

function showData() {
    str = ""
    for (let i = 0; i < dataAry.length; i++) {
        str += dataAry[i];
    }
    elRecordArea.innerHTML = str;
}




function showResult() {
    //計算出BMI
    const rawHeightData = parseInt(document.querySelector('.heightData').value); //輸入的數字默認為字串 轉為數字後toFixed函數方可作用
    const heightData = rawHeightData.toFixed(0); //取身高數值為整數 避免紀錄時破版 
    const rawWeightData = parseInt(document.querySelector('.weightData').value);
    const weightData = rawWeightData.toFixed(1); //取數字至小數第一位
    
    
    const heightMeter = heightData / 100; //將身高單位轉換為公尺
    const rawBMI = weightData/(heightMeter*heightMeter);
    const BMI = rawBMI.toFixed(2);

    if(isNaN(BMI)){alert('請輸入數字！'); return};


    //取得今天日期
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();

    //重複性高的資料,使用物件建立函式
    function BMIstaus(theWord, theShowBox, theClass, theBtnClass, theBorderClass)  {
        this.word = theWord;
        this.showbox = theShowBox;
        this.class = theClass;
        this.btnClass = theBtnClass;
        this.borderClass = theBorderClass;
    }

    const normal = new BMIstaus("理想","show","none","none","none");
    const light = new BMIstaus("過輕","show","light-showbox","light-btn","light-border");
    const fat = new BMIstaus("過重","show","fat-showbox","fat-btn","fat-border");
    const littleFat = new BMIstaus("輕度肥胖","show","fat-showbox","l-fat-btn","l-fat-border");
    const mediumFat = new BMIstaus("中度肥胖","show","m-fat-showbox","m-fat-btn","m-fat-border");
    const heavyFat = new BMIstaus("重度肥胖","show","h-fat-showbox","h-fat-btn","h-fat-border");

    const bodyBMI = {normal,light,fat,littleFat,mediumFat,heavyFat};


    var staus;

    //由BMI判定體重狀態
    
    if (BMI >= 18.5 && BMI < 25) {
        staus = 'normal'; 
    } else if (BMI<18.5){
        staus = 'light';
    } else if (BMI >= 25 && BMI < 30) {
        staus = 'fat';
    } else if (BMI >= 30 && BMI < 35) {
        staus = 'littleFat'
    } else if (BMI >= 35 && BMI < 40) {
        staus = 'mediumFat';
    } else if (BMI > 40) {
        staus = 'heavyFat';
    };

    //上方showBox 文字帶入
    const weightState = document.querySelector('.weightState');
    weightState.textContent = bodyBMI[staus].word;

    
        
    var record = `<ul class="row-record clearFix ${bodyBMI[staus].borderClass}">
        <li ><span class="weightState">${bodyBMI[staus].word}</span></li>
        <li ><p>BMI<span class="scoreBMI">${BMI}</span></p></li>
        <li ><p>weight<span class="weightRecord">${weightData}kg</span></p></li>
        <li ><p>height<span class="heightRecord">${heightData}cm</span></p></li>
        <li ><p class="date">${month}-${date}-${year}</p></li>
    </ul>`;

    dataAry.push(record);//資料儲存於陣列中
    
    showData(); //輸出至頁面
    //儲存資料到localStorage
    localStorage.setItem('BMIrecord', JSON.stringify(dataAry)); //資料轉換為字串後存入localStorage

    //上方showBox樣式更改
    elShowbox.classList.add(bodyBMI[staus].showbox);
    elShowbox.classList.add(bodyBMI[staus].class);
    elBtnRefresh.classList.add(bodyBMI[staus].btnClass);    
}

elResultBtn.addEventListener('click',showResult);


//refresh按鈕功能++ (清除新增的資料) START

function refresh() {
    //取出localdata 
    dataAry = JSON.parse(localStorage.getItem('BMIrecord'));
    dataAry.pop(); //移除最後一筆資料
    showData(); //呈現到網頁上
    localStorage.setItem('BMIrecord', JSON.stringify(dataAry));//轉為字串後儲存
    
    //隱藏結果方塊 秀出計算按鈕
    elShowbox.classList.toggle('show');
}

elBtnRefresh.addEventListener('click',refresh)

//refresh按鈕功能++ (清除新增的資料) END

//清除按鈕功能++ START

function clear() {
    if(confirm("確認要刪除所有紀錄嗎？")){ //點擊後先確認是否要刪除後再繼續執行
    dataAry = [];
    localStorage.setItem('BMIrecord', JSON.stringify(dataAry)); //將資料存入localstorage
    showData();
    } else {return};
}


elBtnClear.addEventListener('click',clear);

//清除按鈕功能++ END
