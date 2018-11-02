//取得DOM
var elResultBtn = document.querySelector('.result-btn');
var elRecordArea = document.querySelector('.record-wrap');
var elShowbox = document.querySelector('.result-showBox');
var elBtnRefresh = document.querySelector('.btn-refresh');
var elBtnClear = document.querySelector('.btn-clear');

//取得localStorage的資料 若無則為空值
var dataAry = JSON.parse(localStorage.getItem('BMIrecord')) || [];

showData();

function showData() {
    str = ""
    for (var i = 0; i < dataAry.length; i++) {
        str += dataAry[i];
    }
    elRecordArea.innerHTML = str;
}




function showResult() {
    //計算出BMI
    var rawHeightData = parseInt(document.querySelector('.heightData').value); //輸入的數字默認為字串 轉為數字後toFixed函數方可作用
    var heightData = rawHeightData.toFixed(0); //取身高數值為整數 避免紀錄時破版 
    var rawWeightData = parseInt(document.querySelector('.weightData').value);
    var weightData = rawWeightData.toFixed(1); //取數字至小數第一位
    
    console.log(heightData);
    
    var heightMeter = heightData / 100; //將身高單位轉換為公尺
    var rawBMI = weightData/(heightMeter*heightMeter);
    var BMI = rawBMI.toFixed(2);

    if(isNaN(BMI)){alert('請輸入數字！'); return};


    //取得今天日期
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var date = today.getDate();

    //由BMI判定體重狀態
    var weightState = document.querySelector('.weightState');
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
    console.log(weightState);
        
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
            console.log(dataAry);
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
    //重新取出放到dataAry 供重新計算
    // dataAry = JSON.parse(localStorage.getItem('BMIrecord')) || [];
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


