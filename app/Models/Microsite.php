<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Microsite extends Model
{
    use HasFactory;
     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'experiences'
    ];

    public static function updateActive($micrositeId = -1,$isActive=false){
        return DB::table('microsites')
            ->where('id', $micrositeId)
            ->update(['isActive' => $isActive]);
    }
    public static function getMicrositeBasicInfoByUserId($userId=-1){
        return DB::table('microsites as microsite')
            ->where('microsite.isActive', true)
            ->join('ventures as ven', 'ven.id', '=', 'microsite.ventureId')
            ->where('ven.userId',$userId)
            ->select("microsite.*")
            ->first();
    }
}
