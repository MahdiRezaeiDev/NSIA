<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CloseApplicationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $application;
    protected $changed = false;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user,$form)
    {
        $this->application =[
            'user_id'=>$user->id,
            'reference_no'=>$form->reference_no,
            'family_form_reference_no'=>$form->family_form_reference_no
        ];
        $this->changed = \App\Individualform::where('family_form_reference_no',$form->family_form_reference_no)->where('opened_by_user_id', $user->id)->update([
            'opened'=>false,
            'opened_by'=>'',
            'opened_by_user_id'=>0
        ]);
       
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastWhen()
    {
        return $this->changed > 0;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('applications');
    }

    public function broadcastAs(){
        return 'closed';
    }
}
