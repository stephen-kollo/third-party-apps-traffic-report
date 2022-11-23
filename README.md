# Atlas Traffic Report
Google Apps Script traffic report for performance marketing agencies<br>
Groups running advertising campaigns data by sources, apps, regions<br>
Sums 

# Concept
<img src="./readme-slides/concept_description.png" style="width: 60%;"> 

# Campaign Naming
To ensure the report works correctly, all advertising campaigns must be named according to the template

<b>Campaign name tamplate:</b>
AppName_Region_Agent_CustomField_AdAccount

<b>Cases:</b>
<br>
✅ MagicPic_AE_BRA_payout:1.4_SAMediaGroup009 <br>
✅ MagicPic_AE_BRA_SAMediaGroup009 <br>
❌ <b>TikTok_</b>MagicPic_AE_BRA_payout:1.4_SAMediaGroup009 <br>
❌ MagicPic<b>.</b>AE<b>.</b>BRA<b>.</b>payout:1.4<b>.</b>SAMediaGroup009 <br>
❌ <b>AE_MagicPic</b>_BRA_payout:1.4_SAMediaGroup009 <br>
