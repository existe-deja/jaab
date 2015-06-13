<?php

class MainController{
  
  function __construct(){

  }


  function beforeRoute(){
    // header('Access-Control-Allow-Origin: *');
  }


  function home(){
    session_start();
    $s = new Session();
    F3::set('SESSION.csrf', $s->csrf());
    F3::set('content', 'home.htm');

    echo View::instance()->render('layout.htm');
  }


  function subscribe(){

    if(F3::get('SESSION.csrf') == F3::get('POST.token')){
      $email_form = F3::get('POST.subscriber');
      $audit = \Audit::instance();
      
      // check if a form data is a valid e-mail address and DNS MX records 
      if($audit->email($email_form, true)){
        $db=new \DB\SQL(
          'mysql:host='.F3::get('mysql_host').
          ';port='.F3::get('mysql_port').
          ';dbname='.F3::get('mysql_dbname'),
          F3::get('mysql_user'),
          F3::get('mysql_pass'),
          array( \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION )
        );

        $inscriptions = new DB\SQL\Mapper($db,'inscriptions');
        $inscriptions->email=$email_form;
        try{
          $inscriptions->save();
        }catch(\PDOException $e){
          echo $e->errorInfo[1];
          return false;
        }

        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }    
  }


  function __destruct(){

  }
}
?>