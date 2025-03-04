<!-- Start::app-content -->
<div class="main-content app-content">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
                <h1 class="page-title fw-medium fs-18 mb-2">Staff</h1>
            </div>
        </div>
        <!-- Page Header Close -->
        <!--Start:: row-7 -->
        <div class="row">
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-header">
                        <div class="card-title">
                            <button type="button" class="btn btn-primary mb-sm-0 mb-1" onclick="editStaff(this)" data-bs-toggle="modal" data-bs-target="#addStaffModal">
                                <i class="bi bi-plus"></i> Add Staff
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div class="row d-flex justify-content-end">
                                <div class="col-xl-4 col-md-12 col-sm-12">
                                    <div class="input-group">
                                        <input type="text" name="datefilter" id="datefilter" class="form-control datefilter" placeholder="Search date">
                                        <button type="button" id="search" class="btn btn-primary">Search</button>&nbsp;
                                        <a href="<?= base_url('staff') ?>" id="search" class="btn btn-primary">Refresh</a>
                                    </div>
                                </div>
                            </div>
                            <table id="staff_list" class="table table-bordered table-hover text-nowrap w-100">
                                <thead class="table-dark">
                                    <tr class="filter-row">
                                        <th>Advanced<br>Search</th>
                                        <th><input type="text" class="column-search form-control"></th>
                                        <th><input type="text" class="column-search form-control"></th>
                                        <th><input type="text" class="column-search form-control"></th>
                                        <th><input type="text" class="column-search form-control"></th>
                                        <th><input type="text" class="column-search form-control"></th>
                                        <th><input type="text" class="column-search form-control"></th>
                                        <th><input type="text" class="column-search form-control"></th>
                                        <th></th>
                                    </tr>
                                    <tr class="text-center">
                                        <th>S.No</th>
                                        <th>Staff ID</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Access</th>
                                        <th>Date of Birth</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--End:: row-7 -->
        
    </div>
</div>
<!-- End::content  -->


<script type="text/javascript">
    $(document).ready(function() {
        $("#datefilter").daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
        });
        var edit_staff = "<?= (!empty($edit_staff) ? true : false); ?>";
        if(edit_staff > 0) {
            $('#addStaffModal').modal('show');
        }
    
        if ($.fn.DataTable.isDataTable('#staff_list')) {
            $('#staff_list').DataTable().clear().destroy();
        }
        
        var table = $('#staff_list').DataTable({
            responsive: !0,
            "processing": true,
            "serverSide": true,
            "lengthMenu":[[10,25,50,100],[10,25,50,100]],
            "ajax": {
                "url": "<?= base_url('getstaffDatas'); ?>",
                "type": "POST",
               "data": function(d) {
                  d['<?= $this->security->get_csrf_token_name(); ?>'] = '<?= $this->security->get_csrf_hash(); ?>';
                  d['datefilter'] = $('#datefilter').val();
                    $('#staff_list .column-search').each(function() {
                        var columnIndex = $(this).parent().index();
                        if (this.value) {
                            d['search_columns[' + columnIndex + ']'] = this.value;
                        }
                    });
               },
               "dataSrc": function(json) {
                   csrfHash = json['<?= $this->security->get_csrf_token_name(); ?>'];
                  return json.data;
               }
            },
            "columns": [
                 { "data": "fld_uid" },
                 { "data": "fld_staffid", "className": "style-column" },
                 { "data": "fld_uname", "className": "style-column"},
                 { "data": "fld_uphone" },
                 { "data": "fld_uemail", "className": "style-column" },
                 { "data": "fld_access" , "className": "style-column"},
                 { "data": "fld_udob" },
                 { "data": "fld_ustatus" },
                 { "data": "action" },
            ],
            "order": [[0, "desc"]],
            "columnDefs": [
                { "orderable": false, "targets": "_all" }
            ],
            "pageLength": 10,
            "colReorder": true,
            "stateSave": true,
            "stateSaveCallback": function(settings, data) {
                localStorage.setItem('staff', JSON.stringify(data));
            },
            "stateLoadCallback": function(settings) {
                var savedState = localStorage.getItem('staff');
                return savedState ? JSON.parse(savedState) : null;
            },
           "dom": "<'row'<'col-sm-4 mt-2'l><'col-sm-4 mt-2 d-flex justify-content-center align-items-center text-center'B><'col-sm-4  mt-2'f>>" + "<'row'<'col-sm-12 mt-2'tr>>" + "<'row'<'col-sm-6 mt-2'i><'col-sm-6 mt-2'p>>",
            "buttons": [
                {
                    "extend": "excel",
                    "title": "Staff Report",
                    "className": "btn-sm",
                    "exportOptions": { 
                        "columns": function(idx, data, node) {
                            return $(node).index() !== $(node).closest('tr').find('td, th').length - 1; 
                        }
                    }
                },
                {
                    "extend": "pdf",
                    "title": "Staff Report",
                    "className": "btn-sm",
                    "orientation": "landscape",
                    "pageSize": "A4",
                    "exportOptions": {
                        "columns": function(idx, data, node) {
                            return $(node).index() !== $(node).closest('tr').find('td, th').length - 1; 
                        }
                    },
                    "customize": function(doc) {
                        if (doc.content.length > 1 && doc.content[1].table) {
                            doc.content[1].table.widths = Array(doc.content[1].table.body[0].length).fill('*');
                            doc.content[1].layout = {
                                hLineWidth: function(i, node) { return 0.5; }, 
                                vLineWidth: function(i, node) { return 0.5; },
                                hLineColor: function(i, node) { return '#aaa'; }, 
                                vLineColor: function(i, node) { return '#aaa'; },
                                paddingLeft: function(i, node) { return 5; },
                                paddingRight: function(i, node) { return 5; },
                                paddingTop: function(i, node) { return 3; },
                                paddingBottom: function(i, node) { return 3; }
                            };

                            doc.pageMargins = [20, 20, 20, 20]; 

                            doc.defaultStyle.fontSize = 8; 
                            doc.content[1].table.body.forEach(function(row) {
                                row.forEach(function(cell) {
                                    cell.fontSize = 8;
                                });
                            });

                            doc.styles.tableHeader = {
                                alignment: 'center',
                                bold: true,
                                fontSize: 10,
                                fillColor: '#f3f3f3'
                            };

                            doc.styles.tableBodyOdd = { alignment: 'center' };
                            doc.styles.tableBodyEven = { alignment: 'center' };

                            doc.styles.tableBody = {
                                alignment: 'center'
                            };
                        }
                    }
                },
                {
                    "extend": "print",
                    "title": "Manage Staff",
                    "className": "btn-sm",
                    "exportOptions": { 
                        "columns": function(idx, data, node) {
                            return $(node).index() !== $(node).closest('tr').find('td, th').length - 1; 
                        }
                    },
                    "customize": function(win) {
                        $(win.document.body)
                            .css('font-size', '10px')
                            .css('text-align', 'center')
                            .css('margin', '0')
                            .css('padding', '0');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit')
                            .css('width', '100%'); 

                        $(win.document.body).find('h1')
                            .css('font-size', '16px')
                            .css('text-align', 'center')
                            .css('margin', '0 0 10px 0');

                        var rows = $(win.document.body).find('table tbody tr');
                        rows.each(function() {
                            if ($(this).find('td').length === 0) { $(this).remove(); }
                        });

                        var css = '@page { size: landscape; }';
                        var style = document.createElement('style');
                        style.type = 'text/css';
                        style.media = 'print';
                        if (style.styleSheet) {
                            style.styleSheet.cssText = css;
                        } else {
                            style.appendChild(document.createTextNode(css));
                        }
                        win.document.head.appendChild(style);

                        $(win.document.body).find('div:last-child').css('page-break-after', 'auto');
                    }
                },
                {
                    "extend": "colvis",
                    "className": "btn-sm",
                    "exportOptions": { "columns": ':visible' }
                },
            ]
        });

        $('#search').on('click', function() {
            table.draw();
        });

        $('#staff_list thead').on('keyup change', '.column-search', function() {
            table.draw();
        });

    });
</script>