<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MicrositeSolicitude extends Model
{
    use HasFactory;



    public static function getMicrositeSolicitudes($filter = null){

        return DB::table('microsite_solicitudes', 'microsol')
                    ->where('microsol.deleted_at', null)
                    ->when($filter, function($query,$filter){
                        return $query->where('status',$filter);
                    })
                    ->join('microsites as microsite', 'microsite.id', '=', 'microsol.micrositeId')
                    ->join('ventures as venture', 'venture.id', '=', 'microsol.ventureId')
                    ->join('users as user', 'user.id', '=', 'microsol.userId')
                    ->join('profiles as profile','profile.userId','=','user.id')
                    ->select('microsol.*', 'microsite.name as micrositeName', 'venture.name as ventureName','profile.names as userName','profile.lastNames as userLastNames')
                    ->get();
    }
}
