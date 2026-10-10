<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
class ApplicationOpenedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $application;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user,$form)
    {
        $this->application = array(
            'reference_no'=> $form->reference_no,
            'family_form_reference_no'=>$form->family_form_reference_no,
            'username'=>$user->name,
            'user_id'=>$user->id
        );
        \App\Individualform::where('family_form_reference_no',$form->family_form_reference_no)->update([
            'opened'=>true,
            'opened_by'=>$user->name,
            'opened_by_user_id'=>$user->id
        ]);
       
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('applications');
    }
    public function broadcastAs(){
        return 'opened';
    }
}
