<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $counts = \App\Individualform::applied()
            ->selectRaw('status, COUNT(*) as total')->groupBy('status')->pluck('total', 'status');
        return view('home', [
            'statusCounts' => $counts,
            'totalApplications' => $counts->sum(),
            'statusLabels' => \App\Individualform::getStatusLabels(),
        ]);
    }
}
