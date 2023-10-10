<?php

namespace App\Services;

use App\Models\Participant;

class DashboardService
{
    public function getData($request): array
    {
       
        //get counts
        $data['all_participants_count'] = Participant::count();
        $data['participants_this_week_count'] = Participant::filter(['participants_this_week' =>1])->count();
        $data['participants_to_be_expired_count'] = Participant::filter(['to_be_expired' => 1])->count();
        $data['participants_expired_count'] = Participant::filter(['expired' => 1])->count();

        //get data
        $data['recent_participants'] = Participant::limit(5)->latest()->get();
        $data['recent_verifications'] = Participant::limit(5)->whereNotNull('last_verified_at')->orderBy('last_verified_at','DESC')->get();
        $data['participants_to_be_expired'] = Participant::filter(['to_be_expired' => 1])->get();
        $data['participants_expired'] =  Participant::filter(['expired' => 1])->get();

        return [
            'success' => true,
            'data' => $data,
        ];
    }
}
