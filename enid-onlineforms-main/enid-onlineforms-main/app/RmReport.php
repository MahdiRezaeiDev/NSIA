<?php
namespace App;
use \DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithChunkReading;
class RmReport  implements ToModel,WithChunkReading{
    private $rows = 0;

    public function model(array $row)
    {
        ++$this->rows;
    
        return [
            'name' => $row[0],
            'father_name' => $row[2],
        ];
    }
    
    public function getRowCount(): int
    {
        return $this->rows;
    }
    public function chunkSize(): int
    {
        return 5;
    }
}