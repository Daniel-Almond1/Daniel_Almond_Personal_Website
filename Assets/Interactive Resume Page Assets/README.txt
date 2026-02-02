Interactive Resume Page Assets
================================

This folder stores all assets specific to the Interactive Resume page (interactive-resume.html).

FOLDER STRUCTURE
----------------
Assets are organized by work experience entry in individual subfolders:

1. Keystone Real Estate/
   - Commercial Real Estate Associate (November 2025 – Present)
   - Store company logos, property photos, marketing materials, etc.

2. Fred Astaire Dance Studio/
   - Franchisee & Co-Owner (October 2025 – Present)
   - Store studio photos, class photos, certificates, marketing materials, etc.

3. Cal Poly Affordable Housing Competition/
   - Project Leader & Team Member (April 2024)
   - Store competition materials, presentations, project photos, etc.

4. Summit State Bank/
   - Bank Teller (December 2022 – July 2023)
   - Store bank-related photos, certificates, etc.

5. Real Estate Agent/
   - Licensed Real Estate Professional (June 2020 – Present)
   - Store real estate photos, transaction documents, etc.

6. Arthur Murray Dance Studio/
   - Dance Instructor & Staff Trainer (June 2019 – November 2022)
   - Store teaching photos, certificates, event photos, etc.

SUPPORTED FILE TYPES
--------------------
- Images: .jpg, .jpeg, .png, .gif, .svg
- Documents: .pdf, .docx, .doc
- Other: Any file type that can be linked or embedded

USAGE IN HTML
-------------
To reference assets in interactive-resume.html, use the following path format:

For images:
    <img src="Assets/Interactive Resume Page Assets/Fred Astaire Dance Studio/your-image.jpg" alt="Description">

For links to documents:
    <a href="Assets/Interactive Resume Page Assets/Keystone Real Estate/your-document.pdf" target="_blank">View Document</a>

Example structure in work experience entry:
    <div class="work-company-logo">
        <img src="Assets/Interactive Resume Page Assets/Fred Astaire Dance Studio/studio-logo.jpg" alt="Fred Astaire Logo">
    </div>

NAMING CONVENTIONS
-----------------
Use descriptive, lowercase filenames with hyphens:
- Good: studio-class-photo.jpg
- Good: keystone-property-listing-2025.jpg
- Avoid: IMG_1234.jpg
- Avoid: Company Logo Final.png

FILE SIZE RECOMMENDATIONS
--------------------------
- Images: Optimize to under 500KB for web performance
- Logos: Keep under 100KB
- Photos: Compress to reasonable size (under 1MB recommended)
- PDFs: Keep file sizes reasonable for download speed

CURRENT ASSETS
--------------
Fred Astaire Dance Studio:
- best_dance_shoes_ballroom_for_beginners.JPG
- certificate_lesson_christmas_dancing_gift_2.JPG
- class_valentines_dance_day_couples.JPG
- classes_dance_drop-in.JPG

NOTES
-----
- Keep assets organized in their respective subfolders
- Use descriptive filenames that indicate the content
- Always use descriptive alt text for images for accessibility
- Update this README if you add new asset categories or change organization structure

Last updated: January 2026
