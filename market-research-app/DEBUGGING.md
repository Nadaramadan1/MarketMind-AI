# Form Submission Debugging Guide

## Quick Checks

### 1. Open Browser Console
1. Open http://localhost:5173 in your browser
2. Press `F12` or `Ctrl+Shift+I` to open Developer Tools
3. Go to the **Console** tab
4. Try submitting the form
5. Look for any red error messages

### 2. Check Network Tab
1. In Developer Tools, go to the **Network** tab
2. Fill in the form and click "Generate Report"
3. Look for a request to `http://localhost:5000/api/start-analysis`
4. Check if:
   - The request appears at all (if not, the form might not be submitting)
   - The request shows a red status (CORS or connection error)
   - The request shows 200 OK (success)

### 3. Common Issues & Solutions

#### Issue: Form doesn't submit at all
**Symptoms:** Nothing happens when you click "Generate Report"
**Solution:** 
- Make sure you filled in BOTH "Target Country" AND "Industry/Niche" fields
- These are required fields (marked with `required` attribute)

#### Issue: CORS Error in Console
**Symptoms:** Error message like "blocked by CORS policy"
**Solution:** The backend server already has CORS enabled, but try:
```bash
# Restart the backend server
cd server
npm run dev
```

#### Issue: "Failed to fetch" or "Network error"
**Symptoms:** Red error in Network tab
**Solution:**
- Verify backend is running: Check that you see "🚀 Server running on http://localhost:5000" in the terminal
- Check the port: Make sure nothing else is using port 5000

#### Issue: Request succeeds but nothing happens
**Symptoms:** Network tab shows 200 OK, but no dashboard appears
**Solution:** Check the browser console for JavaScript errors

## Test the Backend Directly

Run this in a NEW terminal to test if the backend works:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/start-analysis" -Method Post -ContentType "application/json" -Body '{"country": "Germany", "industry": "Technology", "companyType": "startup", "budget": "10k-50k"}'
```

If this works, the backend is fine and the issue is in the frontend.

## Still Not Working?

Take a screenshot of:
1. The browser console (F12 → Console tab)
2. The network tab showing the failed request
3. The form with your input

This will help identify the exact issue.
