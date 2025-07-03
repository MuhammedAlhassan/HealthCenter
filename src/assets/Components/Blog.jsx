import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Blog';

const Blog = () => {
  // All blog posts data with image URLs
  const allPosts = [
    {
      id: 'p1',
      title: 'Essential Antenatal Visits in Nigeria: What to Expect',
      excerpt: 'Learn about the standard schedule for pregnancy check-ups at Nigerian health facilities and why each visit matters.',
      fullContent: `<p>Regular antenatal care is crucial for preventing maternal complications. In Nigeria, the recommended schedule includes:</p>
      <h3>First Trimester (Weeks 1-12)</h3>
      <ul>
        <li>Confirm pregnancy and estimate due date</li>
        <li>Blood tests for HIV, hepatitis, and anemia</li>
        <li>Basic health assessment (weight, blood pressure)</li>
      </ul>
      <h3>Second Trimester (Weeks 13-28)</h3>
      <ul>
        <li>Ultrasound scan (typically around 20 weeks)</li>
        <li>Tetanus toxoid vaccination</li>
        <li>Fetal heartbeat monitoring</li>
      </ul>
      <h3>Third Trimester (Weeks 29-40)</h3>
      <ul>
        <li>More frequent visits to monitor for complications</li>
        <li>Birth planning and emergency preparedness</li>
        <li>Group B strep testing if available</li>
      </ul>`,
      category: 'Pregnancy Care',
      date: 'June 10, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Dr. Amina Yusuf',
        role: 'OB-GYN, LUTH',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    },
    {
      id: 'p2',
      title: 'Recognizing Danger Signs in Pregnancy: When to Seek Help',
      excerpt: 'Critical warning symptoms every Nigerian pregnant woman should know and act upon immediately.',
      fullContent: `<p>Knowing these danger signs could save your life. Seek medical help immediately if you experience:</p>
      <h3>Severe Symptoms</h3>
      <ul>
        <li>Severe headache with vision changes (possible pre-eclampsia)</li>
        <li>Convulsions or loss of consciousness</li>
        <li>Heavy vaginal bleeding</li>
      </ul>
      <h3>Other Warning Signs</h3>
      <ul>
        <li>Severe abdominal pain</li>
        <li>No fetal movement for 12+ hours</li>
        <li>Difficulty breathing</li>
        <li>High fever that won't go down</li>
      </ul>
      <h3>Using Our Emergency Features</h3>
      <ul>
        <li>Press the SOS button in our app to alert nearby clinics</li>
        <li>Text "HELP" to our emergency shortcode</li>
        <li>Ask a family member to call your designated emergency contact</li>
      </ul>`,
      category: 'Emergency Care',
      date: 'June 5, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      author: {
        name: 'Dr. Tunde Okafor',
        role: 'Emergency Physician',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    },
    {
      id: 'p3',
      title: 'Traditional Pregnancy Foods in Nigeria: What\'s Safe?',
      excerpt: 'Evidence-based guidance on common local pregnancy foods and practices.',
      fullContent: `<p>Many Nigerian traditional foods can benefit pregnancy, but some require caution:</p>
      <h3>Recommended Traditional Foods</h3>
      <ul>
        <li>Ugwu (fluted pumpkin) - rich in iron</li>
        <li>Beans - excellent plant protein</li>
        <li>Bitter leaf - helps with digestion</li>
      </ul>
      <h3>Foods to Consume in Moderation</h3>
      <ul>
        <li>Unripe papaya - small amounts only</li>
        <li>Bitter kola - limit quantity</li>
        <li>Palm wine - alcohol content harmful</li>
      </ul>
      <h3>Dangerous Practices to Avoid</h3>
      <ul>
        <li>Herbal concoctions with unknown ingredients</li>
        <li>Excessive hot baths</li>
        <li>Abdominal massages in late pregnancy</li>
      </ul>`,
      category: 'Nutrition',
      date: 'May 28, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
      author: {
        name: 'Nurse Grace Okonkwo',
        role: 'Public Health Specialist',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
      }
    },
    {
      id: 'p4',
      title: 'Preparing for Delivery: Your Nigerian Hospital Bag Checklist',
      excerpt: 'Essential items to pack for your hospital stay, including Nigeria-specific needs.',
      fullContent: `<p>Being prepared can make your delivery experience smoother. Pack these items:</p>
      <h3>For Mother</h3>
      <ul>
        <li>NHIS card or payment for services</li>
        <li>5+ loose nightgowns/wrappers</li>
        <li>Sanitary pads (maternity size)</li>
        <li>Toiletries and slippers</li>
      </ul>
      <h3>For Baby</h3>
      <ul>
        <li>4+ baby vests and wrappers</li>
        <li>Diapers or napkins</li>
        <li>Baby blanket</li>
        <li>Mittens and booties</li>
      </ul>
      <h3>Important Documents</h3>
      <ul>
        <li>Antenatal records</li>
        <li>Husband/partner's blood donor card if available</li>
        <li>Valid ID card</li>
      </ul>`,
      category: 'Delivery Prep',
      date: 'May 20, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      author: {
        name: 'Mrs. Bola Adekunle',
        role: 'Senior Midwife',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
      }
    },
    {
      id: 'p5',
      title: 'Saving for Delivery: Cost Breakdown Across Nigerian Hospitals',
      excerpt: 'Realistic estimates for vaginal and cesarean deliveries in public and private facilities.',
      fullContent: `<p>Understanding delivery costs helps families plan financially:</p>
      <h3>Public Hospitals</h3>
      <ul>
        <li>Normal delivery: ₦20,000 - ₦100,000</li>
        <li>Cesarean section: ₦80,000 - ₦250,000</li>
        <li>NHIS covers significant portion if enrolled</li>
      </ul>
      <h3>Private Hospitals</h3>
      <ul>
        <li>Normal delivery: ₦150,000 - ₦500,000</li>
        <li>Cesarean section: ₦300,000 - ₦1,500,000</li>
        <li>Costs vary by location and facility quality</li>
      </ul>
      <h3>Additional Costs</h3>
      <ul>
        <li>Newborn care (if needed): ₦50,000+ daily</li>
        <li>Emergency blood transfusion: ₦15,000 - ₦50,000 per pint</li>
        <li>Specialist fees for complications</li>
      </ul>`,
      category: 'Finances',
      date: 'May 15, 2024',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1011&q=80',
      author: {
        name: 'Mrs. Chioma Eze',
        role: 'Health Economist',
        avatar: 'https://randomuser.me/api/portraits/women/30.jpg'
      }
    },
    {
      id: 'p6',
      title: 'Postpartum Care in Nigerian Tradition: Best Practices',
      excerpt: 'Balancing cultural postpartum practices with modern medical advice.',
      fullContent: `<p>Nigerian postpartum traditions have both benefits and risks:</p>
      <h3>Helpful Traditional Practices</h3>
      <ul>
        <li>Omugwo (Igbo care tradition) - provides support</li>
        <li>Hot baths with herbs - when not too hot</li>
        <li>Abdominal wrapping - if not too tight</li>
      </ul>
      <h3>Practices Requiring Caution</h3>
      <ul>
        <li>Herbal enemas - can be dangerous</li>
        <li>Extreme heat exposure</li>
        <li>Restrictive diets limiting nutrition</li>
      </ul>
      <h3>Essential Medical Care</h3>
      <ul>
        <li>Postnatal check at 6 weeks</li>
        <li>Family planning counseling</li>
        <li>Mental health screening</li>
      </ul>`,
      category: 'Postpartum',
      date: 'May 10, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1529633980620-4ea1a7949d2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      author: {
        name: 'Dr. Funke Adebayo',
        role: 'Cultural Health Specialist',
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
      }
    }
  ];

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const postsPerPage = 3;

  // Filter posts based on search term
  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Featured post is always the first post when not searching
  const featuredPost = searchTerm ? null : allPosts[0];

  return (
    <div className="blog-page">
      {/* Main Content */}
      <div className="blog-container">
        {/* Featured Post - only shown on first page when not searching */}
        {featuredPost && currentPage === 1 && !selectedPost && (
          <section className="featured-post">
            <div className="featured-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <div className="category-badge">{featuredPost.category}</div>
            </div>
            <div className="featured-content">
              <div className="post-meta">
                <span className="date">{featuredPost.date}</span>
                <span className="dot"></span>
                <span className="read-time">{featuredPost.readTime}</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p className="excerpt">{featuredPost.excerpt}</p>
              <div className="author">
                <img 
                  src={featuredPost.author.avatar} 
                  alt={featuredPost.author.name} 
                  className="avatar"
                />
                <div>
                  <p className="author-name">{featuredPost.author.name}</p>
                  <p className="author-role">{featuredPost.author.role}</p>
                </div>
              </div>
              <button 
                className="read-more"
                onClick={() => setSelectedPost(featuredPost)}
              >
                Read Article <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </section>
        )}

        {/* Full Post View */}
        {selectedPost && (
          <section className="full-post">
            <button 
              className="back-button"
              onClick={() => setSelectedPost(null)}
            >
              <i className="fas fa-arrow-left"></i> Back to Articles
            </button>
            <div className="post-image">
              <img src={selectedPost.image} alt={selectedPost.title} />
              <div className="category-badge">{selectedPost.category}</div>
            </div>
            <div className="post-content">
              <div className="post-meta">
                <span className="date">{selectedPost.date}</span>
                <span className="dot"></span>
                <span className="read-time">{selectedPost.readTime}</span>
              </div>
              <h2>{selectedPost.title}</h2>
              <div 
                className="post-body" 
                dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }} 
              />
              <div className="author">
                <img 
                  src={selectedPost.author.avatar} 
                  alt={selectedPost.author.name} 
                  className="avatar"
                />
                <div>
                  <p className="author-name">{selectedPost.author.name}</p>
                  <p className="author-role">{selectedPost.author.role}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid - shown when no post is selected */}
        {!selectedPost && (
          <div className="blog-main">
            {/* Posts */}
            <section className="posts-grid">
              <h2 className="section-title">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'Latest Articles'}
              </h2>
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid">
                    {currentPosts.map(post => (
                      <article key={post.id} className="post-card">
                        <div className="post-image">
                          <img src={post.image} alt={post.title} />
                          <div className="category-badge">{post.category}</div>
                        </div>
                        <div className="post-content">
                          <div className="post-meta">
                            <span className="date">{post.date}</span>
                            <span className="dot"></span>
                            <span className="read-time">{post.readTime}</span>
                          </div>
                          <h3>{post.title}</h3>
                          <p className="excerpt">{post.excerpt}</p>
                          <button 
                            className="read-more"
                            onClick={() => setSelectedPost(post)}
                          >
                            Read More <i className="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="pagination">
                    <button 
                      onClick={prevPage} 
                      disabled={currentPage === 1}
                      className="btn btn-outline"
                    >
                      <i className="fas fa-chevron-left"></i> Previous
                    </button>
                    <div className="page-numbers">
                      {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage === 1) {
                          pageNum = i + 1;
                        } else if (currentPage === totalPages) {
                          pageNum = totalPages - 2 + i;
                        } else {
                          pageNum = currentPage - 1 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            className={currentPage === pageNum ? 'active' : ''}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      {totalPages > 3 && currentPage < totalPages - 1 && (
                        <span>...</span>
                      )}
                      {totalPages > 3 && currentPage < totalPages - 1 && (
                        <button
                          onClick={() => paginate(totalPages)}
                          className={currentPage === totalPages ? 'active' : ''}
                        >
                          {totalPages}
                        </button>
                      )}
                    </div>
                    <button 
                      onClick={nextPage} 
                      disabled={currentPage === totalPages}
                      className="btn btn-outline"
                    >
                      Next <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </>
              ) : (
                <p className="no-results">No articles found matching your search.</p>
              )}
            </section>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h3>Categories</h3>
                <ul className="categories-list">
                  {['All', 'Pregnancy Care', 'Emergency Care', 'Nutrition', 'Delivery Prep', 'Finances', 'Postpartum'].map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          setSearchTerm(category === 'All' ? '' : category);
                          setCurrentPage(1);
                        }}
                      >
                        {category} <span>({allPosts.filter(p => p.category === category || category === 'All').length})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              
              <div className="sidebar-widget newsletter">
                <h3>Get SMS Health Tips</h3>
                <p>
                  Subscribe to receive weekly pregnancy advice via text message
                </p>
                <form className="newsletter-form">
                  <input 
                    type="tel" 
                    placeholder="Your phone number" 
                    aria-label="Phone number for SMS subscription"
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        )}

        {/* CTA Section - shown when no post is selected */}
        {!selectedPost && (
          <section className="blog-cta">
            <div className="cta-content">
              <h2>Need Immediate Pregnancy Help?</h2>
              <p>
                Use our emergency SOS feature or text "HELP" to 3432 for urgent assistance
              </p>
              <div className="cta-buttons">
                <button className="btn btn-primary">
                  Find Nearby Clinics
                </button>
                <button className="btn btn-outline">
                  Speak to a Midwife
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Blog;