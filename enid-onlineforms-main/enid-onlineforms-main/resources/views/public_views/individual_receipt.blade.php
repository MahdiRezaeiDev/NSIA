
    <style type="text/css">
      .tftable {
        font-size: 10px;
        width: 100%;
        border-width: 1px;
        border-collapse: collapse;
      }
      .tftable th {
        font-size: 10px;
        border-width: 1px;
        padding: 3px;
        border-style: solid;
        text-align: right;
      }
      .tftable td {
        font-size: 10px;
        border-width: 1px;
        padding: 3px;
        border-style: solid;
        text-align: right;
      }
    </style>
  <body>
      <table>
        <tr>
          <td width="49.5%">
            @include('../elements/individual_receipt')
          </td>
          <td width="1%" style="border-left:1px dashed grey;border-right:1px dashed grey">
          </td>
          <td width="49.5%">
            @include('../elements/individual_receipt')
          </td>
        </tr>
      </table>
  </body>
</html>
