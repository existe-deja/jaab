<?php

$f3 = require('lib/base.php');

$f3->config('config/config.ini');
$f3->config('config/routes.ini');
$f3->config('config/db.ini');

$f3->set('CACHE', true);

$f3->run();