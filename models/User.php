<?php

namespace CureCo\models;

use sixon\hwFramework\Application;
use sixon\hwFramework\UserModel;

class User extends UserModel
{
    public $username;
    public $email;
    public $password;

    public $image;

    public static function tableName(): string
    {
        return 'users';
    }

    public function attributes(): array
    {
        return ['email', 'password', 'username'];
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function save()
    {
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        return parent::save();
    }

    public function rules(): array
    {
        return [
            'email' => [self::RULE_REQUIRED],
            'username' => [self::RULE_REQUIRED],
            'password' => [self::RULE_REQUIRED]
        ];
    }

    public function labels(): array
    {
        return [];
    }

    public function getDisplayName(): string
    {
        return $this->username;
    }

    public function getDisplayEmail(): string
    {
        return $this->email;
    }

    public function getDisplayImage(): string
    {
        return 'http://'. $_SERVER['HTTP_HOST'] . '/img/users/' . $this->image;
    }
}