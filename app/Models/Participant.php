<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use EloquentFilter\Filterable;

class Participant extends Model
{
    use HasFactory,Filterable;

    public $guarded  = ['id'];
    public $appends  = ['issue_date_formatted', 'card_expiry_date_formatted'];

    public function modelFilter()
    {
        return $this->provideFilter(\App\ModelFilters\ParticipantFilter::class);
    }

    public function getCreatedAtAttribute(){
        if(@$this->attributes['created_at'])
        return date('d M, Y h:i A', strtotime($this->attributes['created_at']));
    }

    public function getIssueDateFormattedAttribute(){
        if(@$this->attributes['issue_date'])
        return date('d M, Y', strtotime($this->attributes['issue_date']));
    }

    public function getCardExpiryDateFormattedAttribute(){
        if(@$this->attributes['card_expiry_date'])
        return date('d M, Y', strtotime($this->attributes['card_expiry_date']));
    }

    public function getApplicantPictureAttribute(){
        if(@$this->attributes['applicant_picture'])
        return url('/storage/participants/files/'.$this->attributes['applicant_picture']);
    }

    public function getApplicantSignatureAttribute(){
        if(@$this->attributes['applicant_signature'])
        return url('/storage/participants/files/'.$this->attributes['applicant_signature']);
    }

    public function getQrCodeAttribute(){
        if(@$this->attributes['qr_code'])
        return url('/storage/participants/qr-codes/'.$this->attributes['qr_code']);
    }
}
