<!DOCTYPE html>
<html lang="en" dir="ltr" data-nav-layout="horizontal" data-nav-style="menu-click" data-menu-position="fixed" data-theme-mode="light">

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
<!-- Meta Data -->
    <meta charset="UTF-8">
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="Description" content="Winkin Pickel Ball Booking Software">
    <meta name="Author" content="Amorio Technologies Private Limited">
    <meta name="keywords" content="">
    <meta name="csrf-token" content="<?= $this->security->get_csrf_hash(); ?>">

    <!-- TITLE -->
    <title> Winkin </title>

   <!-- Favicon -->
    <link rel="icon" href="<?= base_url('assets/images/company_imgs/').$cmpy_info['fld_cmpyfav']; ?>" width="40px" height="40px" >

    <!-- ICONS CSS -->
    <link href="<?= base_url('assets/icon-fonts/icons.css'); ?>" rel="stylesheet">

    <!-- Bootstrap Css -->
    <link id="style" href="<?= base_url('assets/libs/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet">

    <!-- Node Waves Css -->
    <link href="<?= base_url('assets/libs/node-waves/waves.min.css'); ?>" rel="stylesheet">

    <!-- SwiperJS Css -->
    <link rel="stylesheet" href="<?= base_url('assets/libs/swiper/swiper-bundle.min.css'); ?>">

    <!-- Sweetalerts CSS -->
    <link rel="stylesheet" href="<?= base_url('assets/libs/sweetalert2/sweetalert2.min.css'); ?>">

    <!-- Color Picker Css -->
    <link rel="stylesheet" href="<?= base_url('assets/libs/flatpickr/flatpickr.min.css'); ?>">
    <link rel="stylesheet" href="<?= base_url('assets/libs/@simonwep/pickr/themes/nano.min.css'); ?>">

    <!-- Choices Css -->
    <link rel="stylesheet" href="<?= base_url('assets/libs/choices.js/public/assets/styles/choices.min.css'); ?>">

    <script>
    if (localStorage.udonlandingdarktheme) {
        document.querySelector("html").setAttribute("data-theme-mode", "dark")
    }
    if (localStorage.udonlandingrtl) {
        document.querySelector("html").setAttribute("dir", "rtl")
        document.querySelector("#style")?.setAttribute("href", "<?= base_url('assets/libs/bootstrap/css/bootstrap.rtl.min.css'); ?>");
    }
    </script>

    <!-- APP CSS & APP SCSS -->
    <link rel="preload" as="style" href="<?= base_url('myassets/css/app.css'); ?>" />
    <link rel="stylesheet" href="<?= base_url('myassets/css/app.css'); ?>" />

    <link rel="stylesheet" href="<?= base_url('assets/datatable/dataTables.bootstrap5.min.css'); ?>">
    <link rel="stylesheet" href="<?= base_url('assets/datatable/responsive.bootstrap.min.css'); ?>">
    <link rel="stylesheet" href="<?= base_url('assets/datatable/buttons.bootstrap5.min.css'); ?>">

    <link rel="stylesheet" href="<?= base_url('myassets/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css'); ?>" />
    <link rel="stylesheet" href="<?= base_url('myassets/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css'); ?>" />

    <script src="<?= base_url('/assets/js/jquery-3.7.1.min.js'); ?>"></script>

</head>

<body class="landing-body">

<div class="landing-page-wrapper">

    <header class="app-header">
        <div class="main-header-container container-fluid">
            <div class="header-content-left">
                <div class="header-element">
                    <div class="horizontal-logo">
                        <!-- <a href="" class="header-logo">
                            <img src="<?= base_url('assets/images/brand-logos/amorio-white.png'); ?>" alt="logo" class="toggle-logo">
                            <img src="<?= base_url('assets/images/brand-logos/amorio-dark.png'); ?>" alt="logo" class="toggle-dark">
                        </a> -->
                    </div>
                </div>

                <div class="header-element">
                    <a href="javascript:void(0);" class="sidemenu-toggle header-link" data-bs-toggle="sidebar">
                        <span class="open-toggle">
                            <i class="ri-menu-3-line fs-20"></i>
                        </span>
                    </a>
                </div>
            </div>

            <div class="header-content-right">
                <div class="header-element align-items-center">
                    <!-- Start::header-link|switcher-icon -->
                    <div class="btn-list d-lg-none d-flex">
                        <a href="<?= base_url((!empty($cust_info)) ? 'logout' : 'Login'); ?>" class="btn btn-primary-light">
                            <?= (!empty($cust_info)) ? 'Sign Out' : 'Sign In'; ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- End Main-Header -->

    <aside class="app-sidebar sticky" id="sidebar">
        <div class="container-xl">
            <!-- Start::main-sidebar -->
            <div class="main-sidebar">

                <!-- Start::nav -->
                <nav class="main-menu-container nav nav-pills sub-open">
                    <div class="landing-logo-container">
                        <div class="horizontal-logo">
                            <a href="<?= base_url(''); ?>#home" class="header-logo">
                                <img src="<?= base_url(); ?>/assets/images/company_imgs/<?= $cmpy_info['fld_cmpylogo']; ?>" alt="logo" class="desktop-logo">
                                <img src="<?= base_url(); ?>/assets/images/company_imgs/<?= $cmpy_info['fld_cmpylogo']; ?>" alt="logo" class="desktop-dark">
                            </a>
                        </div>
                    </div>
                    <div class="slide-left" id="slide-left"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                            width="24" height="24" viewBox="0 0 24 24">
                            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                        </svg></div>
                    <ul class="main-menu">
                        <li class="slide">
                            <a href="<?= base_url(''); ?>#home" class="side-menu__item">
                                <span class="side-menu__label">Home</span>
                            </a>
                        </li>

                        <li class="slide">
                            <a href="<?= base_url(''); ?>#about" class="side-menu__item">
                                <span class="side-menu__label">About Us</span>
                            </a>
                        </li>

                        <li class="slide">
                            <a href="<?= base_url('booking'); ?>" class="side-menu__item">
                                <span class="side-menu__label">Booking</span>
                            </a>
                        </li>

                        <li class="slide">
                            <a href="<?= base_url(''); ?>#gallery" class="side-menu__item">
                                <span class="side-menu__label">Gallery</span>
                            </a>
                        </li>

                        <li class="slide">
                            <a href="<?= base_url(''); ?>#contact" class="side-menu__item">
                                <span class="side-menu__label">Contact Us</span>
                            </a>
                        </li>

                    </ul>
                    <div class="slide-right" id="slide-right">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z">
                            </path>
                        </svg>
                    </div>
                    <?php if(!empty($cust_info)) { ?>
                    <ul class="main-menu">
                       <li class="slide has-sub">
                            <a href="javascript:void(0);" class="side-menu__item">
                                <span class="side-menu__label me-2 custname"><?= (!empty($cust_info)) ? $cust_info['cust_name'] : 'Sign In'; ?></span>
                                <i class="fe fe-chevron-right side-menu__angle op-8"></i>
                            </a>
                            <ul class="slide-menu child1">
                                <li class="slide">
                                    <a href="<?= base_url('mybookings'); ?>" class="side-menu__item">My Booking(s)</a>
                                </li>
                                <li class="slide">
                                    <a href="<?= base_url('profile'); ?>" class="side-menu__item">Profile</a>
                                </li>
                                <li class="slide">
                                    <a href="<?= base_url((!empty($cust_info)) ? 'logout' : 'Login'); ?>" class="side-menu__item"><?= (!empty($cust_info)) ? 'Sign Out' : 'Sign In'; ?></a>
                                </li>
                                
                            </ul>
                        </li>
                    </ul>
                    <?php }else{?>
                    <div class="d-lg-flex d-none">
                        <div class="d-lg-flex mt-lg-2 mt-xl-0 mt-0">
                            <a href="<?= base_url((!empty($cust_info)) ? 'logout' : 'Login'); ?>" class="btn btn-wave sign-up-btn">
                                <?= (!empty($cust_info)) ? 'Sign Out' : 'Sign In'; ?>
                            </a>
                        </div>
                    </div>
                    <?php } ?>
                </nav>
                <!-- End::nav -->

            </div>
            <!-- End::main-sidebar -->
        </div>

    </aside>
    <!-- End Main-Sidebar -->
