function count(num1,num2,operator){
  switch(operator){
      case '+':
        var num = num1+num2;
		break;//如果匹配则退出循环
      case '-':
        var num = num1-num2;
		break;
      case '*':
         var num = num1*num2;
		 break;
      case '/':
         var num = num1/num2;
		 break;
    default:
         break;	
  }
  return num;
  }
  
  function abc(num1){
     if(num1>3){
	     abc(--num1);
	 }
	 document.write(num1);
  }