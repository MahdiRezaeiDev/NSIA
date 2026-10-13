(function () {
    'use strict';
    var toggle = document.getElementById('menu-toggle');
    var sidebar = document.getElementById('sidebar');
    var workspace = document.querySelector('.workspace');
    function closeMenu() {
        document.body.classList.remove('menu-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        if (workspace) workspace.inert = false;
        if (sidebar) sidebar.inert = matchMedia('(max-width:760px)').matches;
    }
    if (toggle) {
        closeMenu();
        toggle.addEventListener('click', function () {
            document.body.classList.add('menu-open');
            toggle.setAttribute('aria-expanded', 'true');
            sidebar.inert = false;
            workspace.inert = true;
            sidebar.querySelector('a').focus();
        });
        document.querySelector('[data-close-menu]').addEventListener('click', function () { closeMenu(); toggle.focus(); });
        document.addEventListener('keydown', function (event) {
            if (!document.body.classList.contains('menu-open')) return;
            if (event.key === 'Escape') { closeMenu(); toggle.focus(); }
            if (event.key === 'Tab') {
                var links = sidebar.querySelectorAll('a, button');
                if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); links[links.length - 1].focus(); }
                else if (!event.shiftKey && document.activeElement === links[links.length - 1]) { event.preventDefault(); links[0].focus(); }
            }
        });
        matchMedia('(max-width:760px)').addEventListener('change', closeMenu);
    }
    document.querySelectorAll('[data-reveal-password]').forEach(function (button) {
        button.addEventListener('click', function () {
            var field = document.getElementById(button.getAttribute('aria-controls'));
            var visible = field.type === 'password';
            field.type = visible ? 'text' : 'password';
            button.textContent = visible ? 'پنهان' : 'نمایش';
            button.setAttribute('aria-pressed', String(visible));
        });
    });

    app.config(function ($httpProvider) {
        var token = document.querySelector('meta[name="csrf-token"]');
        if (token) $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    });
    app.run(function ($rootScope) {
        $rootScope.hasErrors = function (errors) { return errors && Object.keys(errors).length > 0; };
    });
    app.controller('PanelListCtrl', function ($scope, $http, $window) {
        var kind, requestId = 0, allTemplates = [];
        var endpoints = { users: '/admin/getUsers', centers: '/admin/getCenters', templates: '/admin/getTemplates', applications: '/getIndividualApplications' };
        $scope.rows = [];
        $scope.filters = { q: '', status: '', center_id: '', limit: 25 };
        $scope.pager = { total: 0, current_page: 1, last_page: 1, from: 0, to: 0 };
        $scope.date = { enabled: false };
        $scope.roleLabels = window.NSIA_ROLES || {};
        $scope.init = function (type, filters, centers, statuses) {
            kind = type;
            angular.forEach(['q', 'status', 'center_id'], function (key) {
                if (filters && filters[key] !== undefined) $scope.filters[key] = String(filters[key]);
            });
            $scope.centers = centers || [];
            $scope.statusLabels = statuses || {};
            $scope.load(1);
            if (type === 'applications' && window.Echo) {
                window.Echo.channel('nsia_database_private-applications').listen('.opened', function (data) { opened(data, true); })
                    .listen('.closed', function (data) { opened(data, false); });
            }
        };
        function opened(data, state) {
            $scope.$evalAsync(function () {
                $scope.rows.forEach(function (row) {
                    if (data.application && row.reference_no == data.application.reference_no) {
                        row.opened = state; row.opened_by = state ? data.application.username : '';
                    }
                });
            });
        }
        $scope.centerName = function (id) {
            var found = $scope.centers.find(function (center) { return center.id == id; });
            return found ? found.name : 'مرکز ' + id;
        };
        function paginateTemplates(page) {
            var query = ($scope.filters.q || '').trim().toLowerCase();
            var filtered = allTemplates.filter(function (row) { return (row.name || '').toLowerCase().indexOf(query) !== -1; });
            var total = filtered.length, limit = $scope.filters.limit, last = Math.max(1, Math.ceil(total / limit));
            page = Math.max(1, Math.min(page, last));
            $scope.rows = filtered.slice((page - 1) * limit, page * limit);
            $scope.pager = { total: total, current_page: page, last_page: last, from: total ? (page - 1) * limit + 1 : 0, to: Math.min(page * limit, total) };
        }
        $scope.load = function (page) {
            page = Math.max(1, +page || 1);
            var current = ++requestId;
            $scope.loading = true;
            $scope.error = '';
            var params = angular.extend({}, $scope.filters, { page: page });
            if ($scope.date.enabled) {
                params.appointment_year = $scope.date.year;
                params.appointment_month = $scope.date.month;
                params.appointment_day = $scope.date.day;
            }
            $http.get(endpoints[kind], { params: kind === 'templates' ? {} : params }).then(function (response) {
                if (current !== requestId) return;
                if (kind === 'templates') { allTemplates = response.data; paginateTemplates(page); return; }
                var data = kind === 'applications' ? response.data.applications : response.data;
                $scope.rows = data.data;
                $scope.pager = data;
                if (page > data.last_page) { $scope.load(data.last_page); return; }
                if (kind === 'applications') $scope.date = response.data.appointmentDate;
            }).catch(function (response) {
                if (current !== requestId) return;
                $scope.rows = [];
                $scope.error = response.status === 401 || response.status === 419 ? 'نشست شما پایان یافته است. دوباره وارد حساب شوید.' : 'معلومات دریافت نشد. لطفاً دوباره کوشش کنید.';
            }).finally(function () { if (current === requestId) $scope.loading = false; });
        };
        $scope.resetFilters = function () {
            angular.extend($scope.filters, { q: '', status: '', center_id: '' });
            $scope.date.enabled = false;
            $scope.load(1);
        };
        $scope.activeDays = function (row) { return ((row.data || {}).days || []).filter(function (day) { return day.active; }).length; };
        $scope.holidayCount = function (row) { return ((row.data || {}).public_holidays || []).length; };
        $scope.removeTemplate = function (row) {
            if (!$window.confirm('قالب «' + row.name + '» حذف شود؟')) return;
            $scope.loading = true;
            $http.get('/admin/deleteTemplate', { params: { id: row.id } }).then(function () { $scope.load($scope.pager.current_page); })
                .catch(function () { $scope.loading = false; $scope.error = 'حذف قالب انجام نشد. دوباره کوشش کنید.'; });
        };
    });
}());
