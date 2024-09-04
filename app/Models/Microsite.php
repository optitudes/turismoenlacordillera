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
        'description'
    ];

    public function venture(){
        return $this->belongsTo(Venture::class,'ventureId');
    }
    public function user(){
        return $this->belongsTo(User::class,'userId');
    }
    public function theme(){
        return $this->belongsTo(MicrositeTheme::class,'themeId');
    }
    public function images(){
        return $this->hasMany(MicrositeImage::class,'micrositeId');
    }
    public function videos(){
        return $this->hasMany(MicrositeVideo::class,'micrositeId');
    }
    public function experiences(){
        return $this->hasMany(Experience::class,'micrositeId');
    }

    public static function updateActive($micrositeId = -1,$isActive=false){
        return DB::table('microsites')
            ->where('id', $micrositeId)
            ->update(['isActive' => $isActive]);
    }
    public static function updatePublish($micrositeId = -1,$isPublish=false){
        return DB::table('microsites')
            ->where('id', $micrositeId)
            ->update(['isPublish' => $isPublish]);
    }
    public static function updateDescription($micrositeId = -1,$description=""){
        return DB::table('microsites')
            ->where('id', $micrositeId)
            ->update(['description' => $description]);
    }
    public static function getMicrositeInfoByUserId($userId=-1){
        return DB::table('microsites as microsite')
            ->where('microsite.isActive', true)
            ->join('ventures as ven', 'ven.id', '=', 'microsite.ventureId')
            ->join('microsite_themes as theme', 'ven.id', '=', 'microsite.ventureId')
            ->where('ven.userId',$userId)
            ->select("microsite.*",)
            ->first();
    }
    public static function findByExperienceId($experienceId = -1){
        return DB::table('experiences as experience')
                        ->where('experience.id',$experienceId)
                        ->join('microsites as microsite','microsite.id','=','experience.micrositeId')
                        ->select('microsite.*')
                        ->first();
    }
    public static function basicInfoSearch($filter = null){
        return DB::table('microsites', 'microsite')
                    ->where('microsite.deleted_at', null)
                    ->where('microsite.isPublish', true)
                    ->where('microsite.isActive', true)
                    ->when($filter, function($query,$filter){
                        return $query->where('microsite.name', 'like', "%{$filter}%");
                    })
                    ->join('ventures as ven','ven.id','=','microsite.ventureId')
                    ->join('profiles as profile','profile.userId','=','microsite.userId')
                    ->select('microsite.id','microsite.name as micrositeName','ven.name','microsite.smallImageUrl','microsite.created_at as date',
                            'profile.names as entrepreneurName','profile.lastNames as entrepreneurLastNames')
                    ->get();
    }
}