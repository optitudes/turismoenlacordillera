<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Venture extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'address',
        'description',
        'mapLatitude',
        'mapLongitude'
    ];

    public static function updateActive($ventureId = -1,$isActive=false){
        return DB::table('ventures')
            ->where('id', $ventureId)
            ->update(['isActive' => $isActive]);

    }
}
