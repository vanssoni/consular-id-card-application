<?php 

namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class ParticipantFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relationMethod => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];

    public function participantsThisWeek($bool){
        $startDate = now()->startOfWeek();
        $endDate = now()->endOfWeek();
        if($bool)
        $this->whereNotNull('created_at')->where('created_at', '<=', $endDate)->where('created_at', '>=', $startDate);
    }

    public function createdAtStartDate($date){
        return $this->where('created_at', '>=', $date);
    }

    public function createdAtEndDate($date){
        return $this->where('created_at', '<=', $date);
    }

    public function expired($bool){
        if($bool)
        return $this->where('card_expiry_date', '<', date('Y-m-d'));
    }

    public function toBeExpired($bool){
       
        $date = now()->subDays(7);
        if($bool)
        return $this->where('card_expiry_date', '>=',$date);
    }
    public function search($search){
       
       return $this->where('first_name', 'like', '%'.$search.'%')
       ->orWhere('last_name', 'like', '%'.$search.'%')
       ->orWhere('gender', 'like', '%'.$search.'%')
       ->orWhere('email', 'like', '%'.$search.'%')
       ->orWhere('dob', 'like', '%'.$search.'%')
       ->orWhere('place_of_birth', 'like', '%'.$search.'%')
       ->orWhere('state_of_origin', 'like', '%'.$search.'%')
       ->orWhere('local_government_area', 'like', '%'.$search.'%')
       ->orWhere('town', 'like', '%'.$search.'%')
       ->orWhere('nigeria_address', 'like', '%'.$search.'%')
       ->orWhere('nigeria_telephone', 'like', '%'.$search.'%')
       ->orWhere('profession', 'like', '%'.$search.'%')
       ->orWhere('passport_number', 'like', '%'.$search.'%')
       ->orWhere('name_of_next_of_kin_in_nigeria', 'like', '%'.$search.'%')
       ->orWhere('address_of_next_of_kin_in_nigeria', 'like', '%'.$search.'%')
       ->orWhere('telephone_of_next_of_kin_in_nigeria', 'like', '%'.$search.'%')
       ->orWhere('date_of_arrival_in_guinea', 'like', '%'.$search.'%')
       ->orWhere('guinea_address', 'like', '%'.$search.'%')
       ->orWhere('guinea_telephone', 'like', '%'.$search.'%')
       ->orWhere('name_of_next_of_kin_in_guinea', 'like', '%'.$search.'%')
       ->orWhere('address_of_next_of_kin_in_guinea', 'like', '%'.$search.'%')
       ->orWhere('telephone_of_next_of_kin_in_guinea', 'like', '%'.$search.'%')
       ->orWhere('card_number', 'like', '%'.$search.'%')
       ->orWhere('issue_date', 'like', '%'.$search.'%')
       ->orWhere('card_expiry_date', 'like', '%'.$search.'%')
       ->orWhere('created_at', 'like', '%'.$search.'%')
       ->orWhere('last_verified_at', 'like', '%'.$search.'%')->orWhere('comments', 'like', '%'.$search.'%');
    }
}
