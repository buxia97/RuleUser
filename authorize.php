<?php
if(isset($_GET['domain'])){
    $domain = $_GET['domain'];
    encryption($domain);
}
function encryption($domain){
    
    $planArr;
    $planVlaue;
    //生成方案
    $plan = rand(0, 2);
    $order = "abcdefghijkmlnopqrstuvwxyz.-1234567890";
    
    $encry1 = "MRqwErtYuiTplKjhgfdSaZXcvbNmQrUMzC+Ay=";
    $encry2 = "qaZWsXedCrfvtgbyhNujmikolpFG+QERxGBn=H";
    $encry3 = "mNBvcXzLkjhGfdsApoIuYtrEWqJH=MxZla+SVy";
    if($plan==0){
        $planVlaue="Gjk==";
        $www = "iurer";
        $planArr=$encry1;
    }
    if($plan==1){
        $planVlaue="MwL==";
        $www = "jjetg";
        $planArr=$encry2;
    }
    if($plan==2){
        $planVlaue="qvB==";
        $www = "cdpvc";
        $planArr=$encry3;
    }
    
    $domain = str_replace("www",$www,$domain);
    $arr=str_split($domain);
    $newArr = array();
    foreach ($arr as $value)
    {
        
        array_push($newArr,strpos($order, $value));
    }
    //print_r($newArr);
    $encryText;
    foreach ($newArr as $v) {
    //echo $v;
       $encryText .= substr($planArr, (int)$v , 1);
    }
    echo $encryText.$planVlaue;
}
?>