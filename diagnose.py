import os
import json
import urllib.request
import urllib.error

def print_separator(title=""):
    print("\n" + "=" * 60)
    if title:
        print(f" 🔍 {title}")
        print("=" * 60)

def check_local_files():
    print_separator("1. CHECKING LOCAL PROJECT STRUCTURE")
    
    cwd = os.getcwd()
    print(f"Current Working Directory: {cwd}\n")
    
    critical_files = ["index.html", "package.json", "vercel.json", "vite.config.js"]
    for file_name in critical_files:
        exists = os.path.exists(os.path.join(cwd, file_name))
        status = "✅ Found" if exists else "❌ Missing"
        print(f"  [{status}] {file_name}")
        
    src_exists = os.path.exists(os.path.join(cwd, "src"))
    print(f"  [{'✅ Found' if src_exists else '❌ Missing'}] /src Directory")

def test_live_endpoints():
    print_separator("2. TESTING LIVE SITE CONNECTIVITY")
    
    domains = [
        "https://toucanobeans.com",
        "https://toucano-beans.vercel.app"
    ]
    
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}
    
    for domain in domains:
        try:
            req = urllib.request.Request(domain, headers=headers)
            with urllib.request.urlopen(req, timeout=5) as response:
                print(f"  ✅ {domain} -> Status: {response.status} OK")
        except urllib.error.HTTPError as e:
            print(f"  ❌ {domain} -> HTTP Error: {e.code} ({e.reason})")
        except urllib.error.URLError as e:
            print(f"  ❌ {domain} -> Connection Failed: {e.reason}")
        except Exception as e:
            print(f"  ⚠️ {domain} -> Unexpected Error: {str(e)}")

def check_github_repo():
    print_separator("3. CHECKING GITHUB REPOSITORY DATA")
    
    api_url = "https://api.github.com/repos/jxssxmna-create/Toucano-Beans/contents"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    try:
        req = urllib.request.Request(api_url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            file_names = [item["name"] for item in data]
            print(f"  Files in GitHub Root: {', '.join(file_names)}\n")
            
            if "index.html" in file_names:
                print("  ✅ index.html is present in GitHub root.")
            else:
                print("  ❌ index.html is missing from GitHub root (Triggers 404 on Vercel).")
                
    except urllib.error.HTTPError as e:
        print(f"  ❌ Failed to fetch GitHub repo: HTTP {e.code}")
    except Exception as e:
        print(f"  ⚠️ GitHub check error: {str(e)}")

if __name__ == "__main__":
    print_separator("TOUCANO BEANS - DIAGNOSTIC SYSTEM")
    check_local_files()
    test_live_endpoints()
    check_github_repo()
    print_separator("DIAGNOSTIC COMPLETE")
