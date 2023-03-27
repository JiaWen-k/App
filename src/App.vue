<template>
  <div id="main">
  <label for="weather" style="font-size:40px; font-family: 'DejaVu Sans Mono';font-weight: bolder;text-align:center;display:block;">Service</label>
    <el-button type="primary" @click="open1">Sign Up</el-button>
    <el-button type="primary" @click="open2">Sign In</el-button>

  <hr>
  <div id="service">
  <div id="weather">

    <label for="weather" style="font-size:25px; font-family:'DejaVu Sans Mono';font-weight: bolder;margin-left: 40px">weather forecast</label>
    <div class="picture-1"> </div>
    <div style="width: 300px">
    <el-form :inline="true" :model="this.weather" class="demo-form-inline" >
      <el-form-item label="city" style="margin-top: 20px;margin-left: 36px">
        <el-input v-model="weather.city" placeholder="city"/>
      </el-form-item>
      <br>
      <br>
      <el-form-item>
        <el-button type="primary" @click="this.open3('weather')" style="margin-left: 70px">API</el-button>
        <el-button type="primary" @click="timerW" style="margin-left: 40px">Query</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div class="chartHeight"  ref="echarts"></div>
  </div>
    <div id="translate">
      <label for="translate" style="font-size:25px; font-family: 'DejaVu Sans Mono';font-weight: bolder;margin-left: 40px">translate</label>

      <div style="width: 100%">
        <el-form :inline="true"  class="demo-form-inline" >
          <el-form-item style="width:100%; margin-top: 20px;margin-left: 36px">
          <el-input  style="width:100px;"  v-model="translate.inputLanguage" /> <div class="picture-2"> </div><el-input  style="width:100px;"  v-model="translate.outputLanguage"/>
          <el-button type="primary" @click="onSubmitT" style="margin-left: 100px">Translate</el-button>
            <el-button type="primary" onclick="this.open3('translate')">API</el-button>
          </el-form-item>
          <el-form-item style="width:40%; margin-top: 20px;margin-left: 36px">
            <el-input   type="textarea" :rows="10" placeholder="input" v-model="translate.input"/>
          </el-form-item>
          <el-form-item  style="width:40%; margin-top: 20px;margin-left: 36px">
            <el-input  type="textarea" :rows="10" :disabled="true" v-model="translate.output"/>
          </el-form-item>
          <br>
          <br>
        </el-form>
      </div>
      <div class="chartHeight"  ref="echarts"></div>
    </div>
  </div>
  </div>
</template>

<script >
import * as echarts from "echarts";
import {Md5} from "./function/translate/md5";

export default {
  name: 'App',
  data() {
    return {
      User:{
        name:'',
        weather:'',
        translate:'',
        SignIn:'N',
      },
      timer:{
        weatherTimer:''
      },
      weather: {
        city: '',
      },
      translate:{
        input:'',
        inputLanguage:'',
        output:'',
        outputLanguage:'',
        salt:1435660288
      },
      langList: {
        'zh': 'Chinese',
        'jp': 'Japanese',
        'jpka': 'Japanese Kana',
        'th': 'Thai',
        'fra': 'French',
        'en': 'English',
        'spa': 'Spanish',
        'kor': 'Korean',
        'tr': 'Turkish',
        'vie': 'Vietnamese',
        'ms': ' Malay ',
        ' de ': ' German ',
        ' ru ': ' Russian ',
        ' ir ': ' Iranian ',
        ' ara ': ' Arabic ',
        ' est ': ' Estonian ',
        ' be ': ' Belarusian ',
        ' bull ': ' Bulgarian ',
        ' hi ': ' Hindi ',
        ' is': 'Icelandic',
        'pl': 'Polish',
        'fa': 'Persian',
        'dan': 'Danish',
        'tl': 'Filipino',
        'fin': 'Finnish',
        'nl': 'Dutch',
        'ca': 'Catalan',
        'cs': ' Czech ',
        ' hr ': ' Croatian ',
        ' lv ': ' Latvian ',
        ' lt ': ' Lithuanian ',
        ' rom ': ' Romanian ',
        ' af ': ' South African ',
        ' no ': ' Norwegian ',
        ' pt_ BR ': ' Brazilian ',
        ' pt ': ' Portuguese ',
        ' swe ': ' Swedish ',
        ' sr ': ' Serbian ',
        ' eo ': ' Esperanto ',
        ' sk ': ' Slovak ',
        ' slo ': ' Slovenian ',
        ' sw ': ' Swahili ',
        ' uk ': ' Ukrainian ',
        ' iw ': ' Hebrew ',
        ' el ': ' Greek ',
        ' hu ': ' Hungarian ',
        ' hy ': ' Armenian ',
        ' it ': ' Italian ',
        ' id ': ' Indonesian ',
        's q': 'Albanian',
        'am': 'Amharic',
        'as': ' Assam ',
        'az': 'Azerbaijani',
        'eu': 'Basque',
        'bn': 'Bengali',
        'bs': ' Bosnian ',
        ' gl ': ' Galician ',
        ' ka ': ' Georgian ',
        ' gu ': ' Gujarati ',
        ' ha ': ' Hausa ',
        ' ig ': ' Ibo ',
        ' iu ': ' Inuit ',
        ' ga ': ' Irish ',
        ' zu ': ' Zulu ',
        ' kn ': ' Kannada ',
        ' kk ': ' Kazakh ',
        ' ky ': ' Kyrgyz ',
        ' lb ': ' Luxembourg ',
        ' mk ': ' Macedonian ',
        ' mt ': ' Malta ',
        'mi ': ' Maori ',
        ' mr ': ' Malathi ',
        ' ne ': ' Nepali ',
        ' or ': ' Oriya ',
        ' pa ': ' Punjabi ',
        ' qu ': ' Ketchua ',
        ' tn ': ' Setswana ',
        ' si ': ' Sinhala ',
        ' ta ': ' Tamil ',
        ' tt ': ' Tatar ',
        ' te ': ' Telugu ',
        ' ur ': ' Urdu ',
        ' uz ': ' Uzbek ',
        ' cy ': ' Wales Language ',
        ' yo ': ' Yoruba ',
        ' yue ': ' Cantonese ',
        ' wyw ': ' Classical Chinese ',
        ' cht ': ' Traditional Chinese '
      },
    }
  },
      methods: {
    //displaying the Sign up window for user
        open1() {
          this.$prompt('Please enter the user name', 'Sign up', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'cancel',
          }).then(({ value }) => {
            this.SignUp(value)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'cancel the Sign up'
            });
          });
        },
        //displaying the Sign In window for user
        open2() {
          this.$prompt('Please enter the user name', 'Sign In', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'cancel',
          }).then(({ value }) => {
            this.SignIn(value)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'cancel the Sign up'
            });
          });
        },
        //displaying the API key change window for user
         open3(service) {
          if(this.User.username===null){
            this.$message({
              type: 'info',
              message: 'please Sign in',
            });
          }
          this.$prompt('Set you weather API', 'API', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'cancel',
          }).then(({ value }) => {
            this.API(value,service)
            this.$message({
              type: 'success',
              message: 'Your API is:' + value,
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'cancel'
            });
          });
        },
        SignUp(name){
          let xhr = new XMLHttpRequest();
          let url = 'http://localhost:3000?function=SignUp&username='+name
          xhr.open('GET', url, false);
          xhr.send();
          let data = eval('(' + xhr.response + ')')
          this.$message({
            type: data.state,
            message: data.message,
          });
        },
        SignIn(name){
          let xhr = new XMLHttpRequest();
          let url = 'http://localhost:3000?function=SignIn&username='+name
          xhr.open('GET', url, false);
          xhr.send();
          this.User.SignIn='Y'
          let data = eval('(' + xhr.response + ')')
          this.$message({
            type: data.state,
            message: data.message,
          });
          this.User=data.data
        },
        API(API,service){
          if(this.User.SignIn==='N'){
            this.$message("please login in first")
          }else {
            this.User['service']=API
            let xhr = new XMLHttpRequest();
            let url = 'http://localhost:3000?function=API&API=' + API + '&name=' + this.User.username + '&service=' + service
            xhr.open('GET', url, false);
            xhr.send();
          }
        },
        onSubmitW() {
            let xhr = new XMLHttpRequest();
            let param = 'q=' + this.weather.city + '&function=weather' + '&API=' + this.User.weather
            let url = 'http://localhost:3000?' + param;
            console.time("Test")
            const timestamp = (new Date()).valueOf();
            console.log("The timestamp at the time of sending")
            console.log(timestamp);
            xhr.open('GET', url, false);
            xhr.send();
            let data = eval('(' + xhr.response + ')')
            console.timeEnd("Test");
            if (data.cod !== '200') {
              this.$message(data.message)
              clearInterval(this.timer.weatherTimer)
            } else {
              this.drawChart(data)
            }
            //API(9291e6dc6828238922ecc80b183eb2a5)
        },
        timerW(){
          if(this.User.SignIn==='N'){
            this.$message("please login in first")
          }else {
          clearInterval(this.timer.weatherTimer)
          this.onSubmitW()
          this.timer.weatherTimer=setInterval(this.onSubmitW,15000)
          }
        },
        onSubmitT() {
          let xhr = new XMLHttpRequest();
          let str='20230206001552138'+this.translate.input+this.translate.salt+'VXuZMtlVmeDWVdxtxyTB'
          let Sign = Md5(str);
          let inputLanguage=this.getKey(this.translate.inputLanguage)
          let outputLanguage=this.getKey(this.translate.outputLanguage)
          let url = 'http://localhost:3000?q='+this.translate.input+'&from='+inputLanguage+'&to='+outputLanguage+'&appid='+this.User.translate+'&salt='+'1435660288'+'&sign='+Sign;
          xhr.open('GET', url, true);
          xhr.send();
          let data = eval('(' + xhr.response + ')')
          this.translate.output=data.trans_result[0].dst;
          //APi(20230206001552138)
          //key(VXuZMtlVmeDWVdxtxyTB)
        },
        getKey(lan){
          for(let p in this.langList){
            if(this.langList[p]===lan){
              return p
            }
          }
        },
        drawChart(weather) {
          let myChart = echarts.init(this.$refs.echarts);
          myChart.setOption({
            tooltip: {},
            xAxis: {
              data: [weather.list[0].dt_txt, weather.list[1].dt_txt, weather.list[2].dt_txt, weather.list[3].dt_txt, weather.list[4].dt_txt, weather.list[5].dt_txt],
              axisLabel: {
                show: true,
                color: '#030100',
                fontSize: 16
              }
            },
            yAxis: {
              axisLabel: {
                show: true,
                color: '#030100',
                fontSize: 16
              }
            },
            series: [
              {
                name: 'K',
                type: 'line',
                data: [weather.list[0].main.temp, weather.list[1].main.temp, weather.list[2].main.temp, weather.list[3].main.temp, weather.list[4].main.temp, weather.list[5].main.temp]
              }
            ]
          });
        }

      }
    }

</script>



<style scoped>
#main{
  width: 100%;
}
#service{
  width: 100%;
  height: 1200px;
  background-color: #efebeb;
}
#weather{
  margin-left: 2.5%;
  margin-top: 20px;
  width: 95%;
  height: 400px;
  background:url( "src/assets/background/weather.png");
  background-size: 100% 100%;
}
.picture-1{
  margin-top: 20px;
  margin-left: 50px;
  width: 128px;
  height: 128px;
  background:url( "src/assets/icon/weather.png");

}
.picture-2{
  margin-right: 10px;
  margin-left: 10px;
  width: 32px;
  height: 32px;
  background:url( "src/assets/icon/translate.png");
}
.demo-form-inline{
  margin:0 auto;
}
.chartHeight{
  position: absolute;
  width: 75%;
  height: 400px;
  left: 300px;
  top:10%
}
</style>