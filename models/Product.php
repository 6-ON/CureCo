<?php

namespace CureCo\models;

use sixon\hwFramework\Application;
use sixon\hwFramework\db\DbModel;

class Product extends DbModel
{
    public $name;
    public $price;
    public $quantity;
    public $image;

    public static function tableName(): string
    {
        return 'products';
    }

    public function attributes(): array
    {
        return ['name', 'price', 'quantity'];
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function rules(): array
    {
        return [
            'name' => [self::RULE_REQUIRED],
            'price' => [self::RULE_REQUIRED],
            'quantity' => [self::RULE_REQUIRED],
        ];

    }

    public static function search(string $term='', $orderBy = []): false|array
    {
        $sql = "SELECT * FROM products WHERE name LIKE CONCAT('%',:term,'%')";
        if (!empty($orderBy)) {
            $sql .= ' ORDER BY ' . implode(',', array_map(function ($v, $k) {
                    return sprintf("%s %s", $k, $v);
                },$orderBy,array_keys($orderBy)));
        }

        $stmt = Application::$app->db->pdo->prepare($sql);
        $stmt->bindValue(':term', $term);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_CLASS, self::class);


    }

    public function labels(): array
    {
        return [];
    }
}