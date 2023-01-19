<?php
/* @var $this \sixon\hwFramework\View */

$this->title = 'Login';
?>
<div class="main-container"
     style="background-image: url('https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"
>

    <div class="auth-container">
        <img src="img/logo.svg" class="w-64 h-64" alt="">
        <form action="" class="auth-form">
            <input type="text" placeholder="email" class="login-field">
            <input type="password" placeholder="*****" class="login-field">
            <div class="ml-2 mt-3 flex items-center gap-2">
                <input type="checkbox" class="dt-checkbox" name="remember-me" id="remember-me">
                <label for="remember-me" class="text-blue-50 font-mono">Remember me</label>
            </div>
            <button type="submit" class="auth-submit">Login</button>
        </form>
    </div>

</div>
