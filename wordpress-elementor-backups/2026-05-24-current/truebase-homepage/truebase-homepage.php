<?php
/**
 * Plugin Name: Truebase Homepage
 * Description: Figma-inspired TrueBase pet memorial products homepage shortcode for WordPress.
 * Version: 1.2.0
 * Author: Codex
 * Text Domain: truebase-homepage
 */

if (!defined('ABSPATH')) {
    exit;
}

define('TRUEBASE_HOMEPAGE_VERSION', '1.2.0');
define('TRUEBASE_HOMEPAGE_URL', plugin_dir_url(__FILE__));

function truebase_homepage_enqueue_assets() {
    wp_enqueue_style(
        'truebase-homepage',
        TRUEBASE_HOMEPAGE_URL . 'assets/truebase-homepage.css',
        array(),
        TRUEBASE_HOMEPAGE_VERSION
    );

    wp_enqueue_script(
        'truebase-homepage',
        TRUEBASE_HOMEPAGE_URL . 'assets/truebase-homepage.js',
        array(),
        TRUEBASE_HOMEPAGE_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'truebase_homepage_enqueue_assets');

function truebase_homepage_asset($path) {
    return esc_url(TRUEBASE_HOMEPAGE_URL . 'assets/' . ltrim($path, '/'));
}

function truebase_homepage_render_shortcode() {
    ob_start();
    ?>
    <div class="tb-home">
        <header class="tb-header" id="top">
            <div class="tb-container tb-header__inner">
                <a class="tb-logo" href="<?php echo esc_url(home_url('/')); ?>" aria-label="TrueBase home">
                    <img src="<?php echo truebase_homepage_asset('images/truebase-logo.png'); ?>" alt="TrueBase">
                    <span>TrueBase</span>
                </a>

                <button class="tb-menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">
                    <span></span>
                    <span></span>
                </button>

                <nav class="tb-nav" aria-label="Primary navigation">
                    <a href="#products">Products</a>
                    <a href="#partnership">Partnership</a>
                    <a href="#process">How It Works</a>
                    <a href="#contact">Contact</a>
                    <a class="tb-nav__button" href="#contact">Become a Partner</a>
                </nav>
            </div>
        </header>

        <main>
            <section class="tb-opening-film" aria-label="TrueBase memory opening film">
                <audio class="tb-opening-film__audio" preload="auto" src="<?php echo truebase_homepage_asset('opening/truebase-calm-memory.wav'); ?>"></audio>

                <div class="tb-opening-film__scene tb-opening-film__scene--one">
                    <img src="<?php echo truebase_homepage_asset('opening/dog-01.jpg'); ?>" alt="Corgi seated in a sunlit garden">
                    <div class="tb-opening-film__content">
                        <p class="tb-opening-film__kicker">TrueBase Memory Film</p>
                        <h1>Every shared day leaves a trace.</h1>
                        <span class="tb-opening-film__line" aria-hidden="true"></span>
                    </div>
                </div>

                <div class="tb-opening-film__scene tb-opening-film__scene--two tb-opening-film__scene--right">
                    <img src="<?php echo truebase_homepage_asset('opening/dog-02.jpg'); ?>" alt="Corgi looking toward its owner">
                    <div class="tb-opening-film__content">
                        <p class="tb-opening-film__kicker">Mutual care</p>
                        <h2>Side by side, we learn how to belong.</h2>
                        <p>A hand to lean on. A familiar heartbeat. Quiet comfort in ordinary days.</p>
                        <span class="tb-opening-film__line" aria-hidden="true"></span>
                    </div>
                </div>

                <div class="tb-opening-film__scene tb-opening-film__scene--three">
                    <img src="<?php echo truebase_homepage_asset('opening/dog-10.jpg'); ?>" alt="Corgi resting in grass and daylight">
                    <div class="tb-opening-film__content">
                        <p class="tb-opening-film__kicker">Life together</p>
                        <h2>Growth, play, walks, waiting, returning.</h2>
                        <p>TrueBase preserves the moments that made a life together.</p>
                    </div>
                </div>

                <div class="tb-opening-film__scene tb-opening-film__scene--four tb-opening-film__scene--right">
                    <img src="<?php echo truebase_homepage_asset('opening/dog-03.jpg'); ?>" alt="Corgi profile in a peaceful garden">
                    <div class="tb-opening-film__content">
                        <p class="tb-opening-film__kicker">Memorial products</p>
                        <h2>Daily memories become lasting keepsakes.</h2>
                        <p>From portraits and engraved pieces to memorial boxes and remembrance gifts, love stays close.</p>
                        <div class="tb-opening-film__cues" aria-label="TrueBase product focus">
                            <span>Keepsake objects</span>
                            <span>Memorial gifts</span>
                            <span>Custom remembrance</span>
                        </div>
                    </div>
                </div>

                <div class="tb-opening-film__scene tb-opening-film__scene--five">
                    <img src="<?php echo truebase_homepage_asset('opening/dog-07.jpg'); ?>" alt="Corgi standing calmly on wooden decking">
                    <div class="tb-opening-film__content tb-opening-film__content--center">
                        <span class="tb-opening-film__symbol" aria-hidden="true"></span>
                        <h2>TrueBase</h2>
                        <p>Memory, made lasting.</p>
                    </div>
                </div>

                <div class="tb-opening-film__grain" aria-hidden="true"></div>
                <div class="tb-opening-film__wash" aria-hidden="true"></div>

                <button class="tb-opening-film__sound" type="button" aria-pressed="false">
                    <span class="tb-opening-film__sound-play">Play sound</span>
                    <span class="tb-opening-film__sound-pause">Pause sound</span>
                </button>
            </section>

            <section class="tb-hero">
                <div class="tb-container tb-hero__inner">
                    <div class="tb-hero__content">
                        <p class="tb-eyebrow">For professional partners</p>
                        <h1>Elevate Your Business with Premium Pet Memorial Products</h1>
                        <p>Designed for pet stores, clinics, and memorial service providers seeking quality and customization.</p>

                        <div class="tb-stats" aria-label="TrueBase business statistics">
                            <div><strong>500+</strong><span>Global Partners</span></div>
                            <div><strong>30+</strong><span>Product Variations</span></div>
                            <div><strong>7-Day</strong><span>Avg. Production</span></div>
                        </div>

                        <div class="tb-actions">
                            <a class="tb-button tb-button--primary" href="#contact">Become a Partner</a>
                            <a class="tb-button tb-button--secondary" href="#products">Request Catalog</a>
                        </div>
                    </div>

                    <div class="tb-hero__visual" aria-label="Pet memorial product display and craft process">
                        <img src="<?php echo truebase_homepage_asset('images/hero-store.jpg'); ?>" alt="Retail shelf display for premium products">
                        <img src="<?php echo truebase_homepage_asset('images/hero-craft.jpg'); ?>" alt="Artisan engraving a custom wooden product">
                    </div>
                </div>
            </section>

            <section class="tb-section" id="serve">
                <div class="tb-container">
                    <div class="tb-section-head">
                        <p class="tb-eyebrow">Our partners</p>
                        <h2>Who We Serve</h2>
                        <p>Trusted by professional businesses who value quality, reliability, and long-term relationships.</p>
                    </div>

                    <div class="tb-card-grid tb-card-grid--three">
                        <article class="tb-card tb-serve-card">
                            <span class="tb-icon">PS</span>
                            <h3>Pet Stores</h3>
                            <p>Expand your product line with premium memorial items that help pet owners honor their beloved companions with dignity.</p>
                        </article>
                        <article class="tb-card tb-serve-card">
                            <span class="tb-icon">VC</span>
                            <h3>Veterinary Clinics</h3>
                            <p>Provide compassionate aftercare solutions to families during difficult times, from consultation room to home.</p>
                        </article>
                        <article class="tb-card tb-serve-card">
                            <span class="tb-icon">FS</span>
                            <h3>Pet Funeral Services</h3>
                            <p>Offer comprehensive memorial packages with customizable, high-quality commemorative product collections.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="tb-section tb-section--cream" id="products">
                <div class="tb-container">
                    <div class="tb-section-head">
                        <p class="tb-eyebrow">Product catalog</p>
                        <h2>Our Product Solutions</h2>
                        <p>Designed to support your business offerings with customizable memorial solutions.</p>
                    </div>

                    <div class="tb-product-grid">
                        <article class="tb-product-card">
                            <img src="<?php echo truebase_homepage_asset('images/product-urns.jpg'); ?>" alt="Ceramic urns displayed with memorial flowers">
                            <p class="tb-tag">Made to order</p>
                            <h3>Pet Urns</h3>
                            <p>Offer premium memorial options that enhance your in-store product value and customer experience.</p>
                        </article>
                        <article class="tb-product-card">
                            <img src="<?php echo truebase_homepage_asset('images/product-frames.jpg'); ?>" alt="Blank memorial frame and canvas display">
                            <p class="tb-tag">Fully customizable</p>
                            <h3>Memorial Frames</h3>
                            <p>Provide personalized memorial solutions tailored to your customers' needs and your brand identity.</p>
                        </article>
                        <article class="tb-product-card">
                            <img src="<?php echo truebase_homepage_asset('images/product-keepsake.jpg'); ?>" alt="Wooden keepsake box with printed photos">
                            <p class="tb-tag">Private label ready</p>
                            <h3>Keepsake Boxes</h3>
                            <p>Add a private-label product line that drives repeat business and deepens customer loyalty.</p>
                        </article>
                        <article class="tb-product-card">
                            <img src="<?php echo truebase_homepage_asset('images/product-engraved.jpg'); ?>" alt="Close-up of an engraved wooden keepsake box">
                            <p class="tb-tag">Multi-material options</p>
                            <h3>Custom Engraved Sets</h3>
                            <p>Differentiate your offerings with coordinated memorial collections across multiple materials.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="tb-section tb-catalog-section">
                <div class="tb-container">
                    <div class="tb-section-head">
                        <p class="tb-eyebrow">Premium memorial catalog</p>
                        <h2>High-End Pet Memorial Product Lines</h2>
                        <p>Curated around the most searched and commercially proven memorial categories: urns, keepsakes, jewelry, glass art, frames, garden markers, and sympathy sets.</p>
                    </div>

                    <div class="tb-catalog-grid">
                        <article class="tb-catalog-card">
                            <div class="tb-catalog-card__media">
                                <img src="<?php echo truebase_homepage_asset('images/product-urns.jpg'); ?>" alt="TrueBase ceramic pet urn collection">
                                <span class="tb-brand-mark">TrueBase</span>
                            </div>
                            <div class="tb-catalog-card__body">
                                <p class="tb-tag">Best seller / Made to order</p>
                                <h3>Signature Ceramic Pet Urns</h3>
                                <p>Premium ceramic and stone-look urns for clinics, funeral homes, and boutique retail displays. Ideal for customers seeking a calm, home-decor-friendly tribute.</p>
                                <ul>
                                    <li>Engraved nameplate, paw motif, or date line</li>
                                    <li>Matte, glazed, marble, and stone-inspired finishes</li>
                                    <li>Optional gift box and sympathy card packaging</li>
                                </ul>
                            </div>
                        </article>

                        <article class="tb-catalog-card">
                            <div class="tb-catalog-card__media">
                                <img src="<?php echo truebase_homepage_asset('images/product-keepsake.jpg'); ?>" alt="TrueBase wooden pet keepsake box">
                                <span class="tb-brand-mark">TrueBase</span>
                            </div>
                            <div class="tb-catalog-card__body">
                                <p class="tb-tag">Private label ready</p>
                                <h3>Wooden Memory & Keepsake Boxes</h3>
                                <p>Luxury wood boxes designed for collars, fur clippings, photos, tags, and small memorial items. Strong fit for aftercare packages and retail add-ons.</p>
                                <ul>
                                    <li>Laser engraving for pet name, dates, and short message</li>
                                    <li>Velvet insert, photo slot, or compartment layout</li>
                                    <li>OEM logo plaque and branded outer sleeve</li>
                                </ul>
                            </div>
                        </article>

                        <article class="tb-catalog-card">
                            <div class="tb-catalog-card__media">
                                <img src="<?php echo truebase_homepage_asset('images/catalog-jewelry.jpg'); ?>" alt="TrueBase pet ashes pendant necklace">
                                <span class="tb-brand-mark">TrueBase</span>
                            </div>
                            <div class="tb-catalog-card__body">
                                <p class="tb-tag">Top memorial gift category</p>
                                <h3>Ashes & Paw Print Jewelry</h3>
                                <p>Wearable keepsakes including pendants, bracelets, rings, and keychain urns. Designed for families who want a small, personal memorial close at hand.</p>
                                <ul>
                                    <li>Stainless steel, silver-tone, gold-tone, or plated options</li>
                                    <li>Sealed chamber, paw print, name, and birthstone details</li>
                                    <li>Premium pouch, care card, and display tray available</li>
                                </ul>
                            </div>
                        </article>

                        <article class="tb-catalog-card">
                            <div class="tb-catalog-card__media">
                                <img src="<?php echo truebase_homepage_asset('images/product-frames.jpg'); ?>" alt="TrueBase memorial photo frame and canvas">
                                <span class="tb-brand-mark">TrueBase</span>
                            </div>
                            <div class="tb-catalog-card__body">
                                <p class="tb-tag">Clinic aftercare favorite</p>
                                <h3>Memorial Photo Frames</h3>
                                <p>Elegant tabletop frames and shadow-box style displays for photos, collars, paw prints, and small keepsakes. Built for compassionate clinic handoff programs.</p>
                                <ul>
                                    <li>Photo, collar, tag, and paw-impression layouts</li>
                                    <li>Wood, acrylic, metal accent, and linen finishes</li>
                                    <li>Custom insert cards for veterinary partners</li>
                                </ul>
                            </div>
                        </article>

                        <article class="tb-catalog-card">
                            <div class="tb-catalog-card__media">
                                <img src="<?php echo truebase_homepage_asset('images/catalog-glass-art.jpg'); ?>" alt="TrueBase glass memorial art keepsake">
                                <span class="tb-brand-mark">TrueBase</span>
                            </div>
                            <div class="tb-catalog-card__body">
                                <p class="tb-tag">Premium upgrade</p>
                                <h3>Glass Art Keepsakes</h3>
                                <p>Decorative glass-inspired memorial pieces positioned as high-end upgrades for families seeking a display object rather than a traditional urn.</p>
                                <ul>
                                    <li>Orb, heart, touchstone, and desktop-object formats</li>
                                    <li>Opal, pearl, smoke, and soft color stories</li>
                                    <li>Certificate card and presentation box supported</li>
                                </ul>
                            </div>
                        </article>

                        <article class="tb-catalog-card">
                            <div class="tb-catalog-card__media">
                                <img src="<?php echo truebase_homepage_asset('images/product-engraved.jpg'); ?>" alt="TrueBase custom engraved wooden memorial set">
                                <span class="tb-brand-mark">TrueBase</span>
                            </div>
                            <div class="tb-catalog-card__body">
                                <p class="tb-tag">Custom engraved</p>
                                <h3>Engraved Memorial Sets</h3>
                                <p>Coordinated sets that combine a keepsake box, mini urn, photo card, and personalized engraving for a polished, premium package experience.</p>
                                <ul>
                                    <li>Bundle-friendly for funeral service providers</li>
                                    <li>Name, date, quote, icon, and pattern engraving</li>
                                    <li>Low-MOQ branded packaging for partners</li>
                                </ul>
                            </div>
                        </article>

                        <article class="tb-catalog-card">
                            <div class="tb-catalog-card__media">
                                <img src="<?php echo truebase_homepage_asset('images/catalog-garden-stone.jpg'); ?>" alt="TrueBase garden memorial stone collection">
                                <span class="tb-brand-mark">TrueBase</span>
                            </div>
                            <div class="tb-catalog-card__body">
                                <p class="tb-tag">Outdoor memorial</p>
                                <h3>Garden Stones & Grave Markers</h3>
                                <p>Outdoor memorial markers for gardens, burial areas, and home landscapes. A popular personalized category for pet loss gifts and aftercare catalogs.</p>
                                <ul>
                                    <li>Granite-look, slate-look, river-stone, or plaque formats</li>
                                    <li>Weather-resistant engraving and silhouette options</li>
                                    <li>Retail counter samples and catalog cards available</li>
                                </ul>
                            </div>
                        </article>

                        <article class="tb-catalog-card">
                            <div class="tb-catalog-card__media">
                                <img src="<?php echo truebase_homepage_asset('images/catalog-candle.jpg'); ?>" alt="TrueBase pet sympathy candle and remembrance set">
                                <span class="tb-brand-mark">TrueBase</span>
                            </div>
                            <div class="tb-catalog-card__body">
                                <p class="tb-tag">Sympathy add-on</p>
                                <h3>Remembrance Candles & Gift Sets</h3>
                                <p>Thoughtful sympathy products that pair well with urns, frames, and keepsake boxes. Useful for clinics and retailers building tiered memorial bundles.</p>
                                <ul>
                                    <li>Candle, card, mini frame, charm, or token combinations</li>
                                    <li>Custom scent label and TrueBase partner packaging</li>
                                    <li>Designed for giftable, condolence-focused presentation</li>
                                </ul>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section class="tb-section" id="why">
                <div class="tb-container">
                    <div class="tb-section-head">
                        <p class="tb-eyebrow">Why TrueBase</p>
                        <h2>Why Businesses Choose TrueBase</h2>
                        <p>Built for long-term business partnerships.</p>
                    </div>

                    <div class="tb-card-grid tb-card-grid--four">
                        <article class="tb-card tb-feature-card">
                            <span class="tb-feature-icon">C</span>
                            <h3>Fully Customizable</h3>
                            <p>Every detail adapted to your brand, your customers, and your market.</p>
                        </article>
                        <article class="tb-card tb-feature-card">
                            <span class="tb-feature-icon">Q</span>
                            <h3>Premium Quality Materials</h3>
                            <p>Sourced from trusted suppliers with consistent quality control.</p>
                        </article>
                        <article class="tb-card tb-feature-card">
                            <span class="tb-feature-icon">S</span>
                            <h3>Stable Supply & Production</h3>
                            <p>Reliable manufacturing with clear timelines and low MOQs.</p>
                        </article>
                        <article class="tb-card tb-feature-card">
                            <span class="tb-feature-icon">7D</span>
                            <h3>Fast Turnaround Time</h3>
                            <p>7-day average production. Priority options available for urgent orders.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="tb-section tb-section--cream" id="partnership">
                <div class="tb-container">
                    <div class="tb-section-head">
                        <p class="tb-eyebrow">Partnership models</p>
                        <h2>Flexible Partnership Models</h2>
                        <p>Choose the model that fits your business.</p>
                    </div>

                    <div class="tb-partner-grid">
                        <article class="tb-partner-card">
                            <span>01</span>
                            <h3>Wholesale</h3>
                            <p>Bulk purchasing at competitive prices with stable supply, consistent quality control, and dedicated account support.</p>
                            <ul>
                                <li>Low minimum order quantity</li>
                                <li>Consistent quality control</li>
                                <li>Dedicated account manager</li>
                            </ul>
                            <a href="#contact">Learn more</a>
                        </article>
                        <article class="tb-partner-card tb-partner-card--featured">
                            <div class="tb-most">Most</div>
                            <span>02</span>
                            <h3>Customization</h3>
                            <p>Tailored products based on your customers' needs, with materials, sizes, engravings, and packaging configured for your brand.</p>
                            <ul>
                                <li>Custom dimensions & materials</li>
                                <li>Full branding & packaging</li>
                                <li>Design support included</li>
                            </ul>
                            <a class="tb-button tb-button--primary" href="#contact">Start Customizing</a>
                        </article>
                        <article class="tb-partner-card">
                            <span>03</span>
                            <h3>Private Label / OEM</h3>
                            <p>Build and grow your own brand using our manufacturing capabilities. Full production support from prototyping to delivery.</p>
                            <ul>
                                <li>Your brand, our production</li>
                                <li>Full OEM & ODM support</li>
                                <li>Prototype to bulk ready</li>
                            </ul>
                            <a href="#contact">Learn more</a>
                        </article>
                    </div>
                </div>
            </section>

            <section class="tb-section" id="process">
                <div class="tb-container">
                    <div class="tb-section-head">
                        <p class="tb-eyebrow">Process</p>
                        <h2>How It Works</h2>
                        <p>A simple and efficient process from inquiry to delivery.</p>
                    </div>

                    <div class="tb-process">
                        <div><span>01</span><h3>Contact Us</h3><p>Reach out via email or form. We respond within 24 hours.</p></div>
                        <div><span>02</span><h3>Product Selection</h3><p>Browse our catalog and choose the right product lines.</p></div>
                        <div><span>03</span><h3>Customization</h3><p>Work with our team to configure materials, engravings, and branding.</p></div>
                        <div><span>04</span><h3>Production</h3><p>Your order enters production with regular status updates.</p></div>
                        <div><span>05</span><h3>Delivery</h3><p>Packaged and shipped directly to your business address.</p></div>
                    </div>
                </div>
            </section>

            <section class="tb-section tb-section--cream" id="scenarios">
                <div class="tb-container">
                    <div class="tb-section-head">
                        <p class="tb-eyebrow">Use cases</p>
                        <h2>Application Scenarios</h2>
                        <p>Where our products create value for your business.</p>
                    </div>

                    <div class="tb-scenario-grid">
                        <article style="background-image: url('<?php echo truebase_homepage_asset('images/scenario-store.jpg'); ?>');">
                            <div><p class="tb-eyebrow">In-store memorial display</p><h3>In-Store Memorial Display</h3><p>Curated product displays that drive additional revenue in retail environments.</p></div>
                        </article>
                        <article style="background-image: url('<?php echo truebase_homepage_asset('images/scenario-veterinary.jpg'); ?>');">
                            <div><p class="tb-eyebrow">Veterinary service integration</p><h3>Veterinary Service Integration</h3><p>Compassionate, discreet product offerings integrated into clinic aftercare protocols.</p></div>
                        </article>
                        <article style="background-image: url('<?php echo truebase_homepage_asset('images/scenario-memorial.jpg'); ?>');">
                            <div><p class="tb-eyebrow">Premium memorial offering</p><h3>Premium Memorial Offering</h3><p>Complete collections for funeral service providers to offer families a meaningful farewell.</p></div>
                        </article>
                        <article style="background-image: url('<?php echo truebase_homepage_asset('images/scenario-supply.jpg'); ?>');">
                            <div><p class="tb-eyebrow">Reliable supply & fulfillment</p><h3>Reliable Supply & Fulfillment</h3><p>Consistent supply chain with predictable lead times and flexible order volumes.</p></div>
                        </article>
                    </div>
                </div>
            </section>

            <section class="tb-cta" id="contact">
                <div class="tb-container tb-cta__inner">
                    <p class="tb-eyebrow">Get started</p>
                    <h2>Start Your Partnership Today</h2>
                    <p>Join our network of trusted partners and offer premium memorial products to your customers.</p>
                    <p class="tb-cta__note">Start with a conversation. No commitment required.</p>
                    <div class="tb-actions">
                        <a class="tb-button tb-button--primary" href="mailto:partner@truebaseholding.com">Become a Partner</a>
                        <a class="tb-button tb-button--secondary tb-button--dark" href="mailto:partner@truebaseholding.com">Request Samples</a>
                        <a class="tb-button tb-button--secondary tb-button--dark" href="mailto:partner@truebaseholding.com">Get a Quote</a>
                    </div>
                </div>
            </section>
        </main>

        <footer class="tb-footer">
            <div class="tb-container tb-footer__grid">
                <div>
                    <h3>TrueBase</h3>
                    <p>Premium memorial solutions for professional partners.</p>
                </div>
                <div>
                    <h3>Products</h3>
                    <a href="#products">Pet Urns</a>
                    <a href="#products">Memorial Frames</a>
                    <a href="#products">Keepsake Boxes</a>
                    <a href="#products">Custom Sets</a>
                    <a href="#products">Private Label</a>
                </div>
                <div>
                    <h3>Partnership</h3>
                    <a href="#partnership">Wholesale</a>
                    <a href="#partnership">Customization</a>
                    <a href="#partnership">OEM / ODM</a>
                    <a href="#contact">Request Catalog</a>
                    <a href="#contact">Become a Partner</a>
                </div>
                <div>
                    <h3>Contact</h3>
                    <p>partner@truebaseholding.com</p>
                    <p>+1 626 452 7696<br>Mon - Fri 09:00 - 18:00 CST</p>
                </div>
            </div>
            <div class="tb-container tb-footer__bottom">
                <span>© 2026 TrueBase. All rights reserved.</span>
                <span>Privacy Policy&nbsp;&nbsp;&nbsp; Terms of Service&nbsp;&nbsp;&nbsp; Cookie Policy</span>
            </div>
        </footer>
    </div>
    <?php

    return ob_get_clean();
}
add_shortcode('truebase_homepage', 'truebase_homepage_render_shortcode');
