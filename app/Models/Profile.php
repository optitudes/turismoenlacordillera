<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'names',
        'lastNames',
        'address',
        'idNumber',
        'pictureUrl',
        'phoneNumber',
        'phonePrefix',
        'department',
        'municipality',
    ];


}
