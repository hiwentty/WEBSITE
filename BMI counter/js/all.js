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
    let BMI = rawBMI.toFixed(2);

    if(isNaN(BMI)){alert('請輸入數字！'); return};


    //取得今天日期
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();

    //由BMI判定體重狀態
    const weightState = document.querySelector('.weightState');
    if (BMI >= 18.5 && BMI < 25) {
        weightState.textContent= '理想';
    } else if (BMI<18.5){
        weightState.textContent='過輕';
    } else if (BMI >= 25 && BMI < 30) {
        weightState.textContent = '過重';
    } else if (BMI >= 30 && BMI < 35) {
        weightState.textContent = '輕度肥胖';
    } else if (BMI >= 35 && BMI < 40) {
        weightState.textContent = '中度肥胖';
    } else if (BMI > 40) {
        weightState.textContent = '重度肥胖';
    };

    
        
    switch (weightState.textContent) {
        case '理想':
            var record = '<ul class="row-record clearFix">'+
                '<li ><span class="weightState">'+weightState.textContent+'</span></li>' +
                '<li ><p>BMI<span class="scoreBMI">'+BMI+'</span></p></li>'+
                '<li ><p>weight<span class="weightRecord">'+weightData+'kg</span></p></li>'+
                '<li ><p>height<span class="heightRecord">'+heightData+'cm</span></p></li>'+
                '<li ><p class="date">'+month+'-'+date+'-'+year+'</p></li>'+
            '</ul>';

            dataAry.push(record);//資料儲存於陣列中
            
            showData(); //輸出至頁面
            //儲存資料到localStorage
            localStorage.setItem('BMIrecord', JSON.stringify(dataAry)); //資料轉換為字串後存入localStorage

            //showBox樣式更改
            elShowbox.classList.add('show');  

            return

        case '過輕':
            var record = '<ul class="row-record clearFix light-border">' +
                '<li ><span class="weightState">'+weightState.textContent+'</span></li>' +
                '<li ><p>BMI<span class="scoreBMI">' + BMI + '</span></p></li>' +
                '<li ><p>weight<span class="weightRecord">' + weightData + 'kg</span></p></li>' +
                '<li ><p>height<span class="heightRecord">' + heightData + 'cm</span></p></li>' +
                '<li ><p class="date">' + month + '-' + date + '-' + year + '</p></li>' +
                '</ul>';

            dataAry.push(record); //資料儲存於陣列中
            showData(dataAry); //輸出至頁面
            //儲存資料到localStorage
            localStorage.setItem('BMIrecord', JSON.stringify(dataAry)); //資料轉換為字串後存入localStorage


            //showBox樣式更改
            elShowbox.classList.add('light-showbox','show');
            elBtnRefresh.classList.add('light-btn');

            return        
        
        case '過重':
            var record = '<ul class="row-record clearFix fat-border">' +
                '<li ><span class="weightState">' + weightState.textContent + '</span></li>' +
                '<li ><p>BMI<span class="scoreBMI">' + BMI + '</span></p></li>' +
                '<li ><p>weight<span class="weightRecord">' + weightData + 'kg</span></p></li>' +
                '<li ><p>height<span class="heightRecord">' + heightData + 'cm</span></p></li>' +
                '<li ><p class="date">' + month + '-' + date + '-' + year + '</p></li>' +
                '</ul>';

            dataAry.push(record); //資料儲存於陣列中
            showData(dataAry); //輸出至頁面
            //儲存資料到localStorage
            localStorage.setItem('BMIrecord', JSON.stringify(dataAry)); //資料轉換為字串後存入localStorage


            //showBox樣式更改
            elShowbox.classList.add('fat-showbox', 'show');
            elBtnRefresh.classList.add('fat-btn');

            return
        
        case '輕度肥胖':
            var record = '<ul class="row-record clearFix l-fat-border">' +
                '<li ><span class="weightState">' + weightState.textContent + '</span></li>' +
                '<li ><p>BMI<span class="scoreBMI">' + BMI + '</span></p></li>' +
                '<li ><p>weight<span class="weightRecord">' + weightData + 'kg</span></p></li>' +
                '<li ><p>height<span class="heightRecord">' + heightData + 'cm</span></p></li>' +
                '<li ><p class="date">' + month + '-' + date + '-' + year + '</p></li>' +
                '</ul>';

            dataAry.push(record); //資料儲存於陣列中
            showData(dataAry); //輸出至頁面
            //儲存資料到localStorage
            localStorage.setItem('BMIrecord', JSON.stringify(dataAry)); //資料轉換為字串後存入localStorage


            //showBox樣式更改
            elShowbox.classList.add('l-fat-showbox', 'show');
            elBtnRefresh.classList.add('l-fat-btn');

            return
        
        case '中度肥胖':
            var record = '<ul class="row-record clearFix m-fat-border">' +
                '<li ><span class="weightState">' + weightState.textContent + '</span></li>' +
                '<li ><p>BMI<span class="scoreBMI">' + BMI + '</span></p></li>' +
                '<li ><p>weight<span class="weightRecord">' + weightData + 'kg</span></p></li>' +
                '<li ><p>height<span class="heightRecord">' + heightData + 'cm</span></p></li>' +
                '<li ><p class="date">' + month + '-' + date + '-' + year + '</p></li>' +
                '</ul>';

            dataAry.push(record); //資料儲存於陣列中
            showData(dataAry); //輸出至頁面
            //儲存資料到localStorage
            localStorage.setItem('BMIrecord', JSON.stringify(dataAry)); //資料轉換為字串後存入localStorage


            //showBox樣式更改
            elShowbox.classList.add('m-fat-showbox', 'show');
            elBtnRefresh.classList.add('m-fat-btn');

            return

        case '重度肥胖':
            var record = '<ul class="row-record clearFix l-fat-border">' +
                '<li ><span class="weightState">' + weightState.textContent + '</span></li>' +
                '<li ><p>BMI<span class="scoreBMI">' + BMI + '</span></p></li>' +
                '<li ><p>weight<span class="weightRecord">' + weightData + 'kg</span></p></li>' +
                '<li ><p>height<span class="heightRecord">' + heightData + 'cm</span></p></li>' +
                '<li ><p class="date">' + month + '-' + date + '-' + year + '</p></li>' +
                '</ul>';

            dataAry.push(record); //資料儲存於陣列中
            showData(dataAry); //輸出至頁面
            //儲存資料到localStorage
            localStorage.setItem('BMIrecord', JSON.stringify(dataAry)); //資料轉換為字串後存入localStorage


            //showBox樣式更改
            elShowbox.classList.add('l-fat-showbox', 'show');
            elBtnRefresh.classList.add('l-fat-btn');

        return
    }
}

elResultBtn.addEventListener('click',showResult);


//refresh按鈕功能++ (清除新增的資料)

function refresh() {
    //取出localdata 
    dataAry = JSON.parse(localStorage.getItem('BMIrecord'));
    dataAry.pop();
    console.log(dataAry);
    showData(); //呈現到網頁上
    localStorage.setItem('BMIrecord', JSON.stringify(dataAry));//轉為字串後儲存
    
    //隱藏結果方塊 秀出計算按鈕
    elShowbox.classList.toggle('show');
}

elBtnRefresh.addEventListener('click',refresh)


//清除按鈕功能++

function clear() {
    dataAry = [];
    localStorage.setItem('BMIrecord', JSON.stringify(dataAry));
    showData();
}


elBtnClear.addEventListener('click',clear);


